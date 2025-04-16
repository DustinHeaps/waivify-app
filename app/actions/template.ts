"use server";

import { db } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { z } from "zod";
import { v4 as uuidv4 } from "uuid";
import { getUserById, updateUser } from "./user";
import { trackEvent } from '@/lib/posthog/posthog.server';

const TemplateSchema = z.object({
  name: z.string().min(1),
  fields: z.array(
    z.object({
      label: z.string().min(1),
      type: z.enum(["text", "date", "checkbox"]),
      required: z.boolean(),
    })
  ),
});
export async function getAllUserTemplates(userId: string) {

  const templates = await db.template.findMany({
    where: {
      OR: [
        { isDefault: true },
        { userId: userId },
      ],
    },
    orderBy: {
      name: "asc",
    },
  });

  return templates
  
}

export async function getDefaultTemplates() {
  const templates = await db.template.findMany({
    where: {
      isDefault: true,
    },
    orderBy: {
      name: "asc",
    },
  });

  return templates
}

export async function createTemplate() {
  const { userId } = await auth();
  if (!userId) throw new Error("Not authenticated");

  // const parsed = TemplateSchema.safeParse(data);

  // if (!parsed.success) {
  //   console.error("Invalid template data:", parsed.error.flatten());
  //   throw new Error("Invalid form data");
  // }

  // const { name, fields } = parsed.data;

  const template = await db.template.create({
    data: {
      name: "Untitled Waiver",
      fields: [],
      user: {
        connect: { clerkId: userId },
      },
      isDefault: false,
    },
  });

  return template;
}

export async function updateTemplate(id: string, name: string, fields: any[]) {

  await trackEvent({
    event: "template_updated",
    distinctId: id,
  });

  return await db.template.update({
    where: { id },
    data: {
      name,
      fields,
    },
  });
}

export async function getOrCreateUserTemplate() {
  const { userId } = await auth();
  const dbUser = await getUserById();
  if (!userId) throw new Error("Not authenticated");

  await trackEvent({
    event: "template_created",
    distinctId: "server",
  });

  if (dbUser?.publicTemplateId) {
    const existing = await db.template.findFirst({
      where: { userId: dbUser?.id },
      orderBy: { createdAt: "desc" },
    });
    return existing;
  }

  const newTemplate = await db.template.create({
    data: {
      name: "Untitled Waiver",
      user: {
        connect: { clerkId: userId },
      },
      isDefault: false,
      fields: [
        {
          id: uuidv4(),
          type: "text",
          label: "Full Name",
          required: true,
          disabled: true,
        },
      ],
    },
  });

  await updateUser(userId, {
    publicTemplateId: newTemplate.id,
  });

   await trackEvent({
      event: "template_created",
      distinctId: newTemplate.id,
    });

  return newTemplate;
}
