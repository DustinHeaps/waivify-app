"use server";

import { db } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { z } from "zod";

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

export async function getDefaultTemplates() {
  return await db.template.findMany({
    where: {
      isDefault: true,
    },
    orderBy: {
      name: "asc",
    },
  });
}

export async function createTemplate(data: unknown) {
  const { userId } = await auth();
  if (!userId) throw new Error("Not authenticated");

  const parsed = TemplateSchema.safeParse(data);
  if (!parsed.success) {
    console.error("Invalid template data:", parsed.error.flatten());
    throw new Error("Invalid form data");
  }

  const { name, fields } = parsed.data;

  const template = await db.template.create({
    data: {
      name,
      fields,
      user: {
        connect: { clerkId: userId },
      },
    },
  });

  return template;
}
