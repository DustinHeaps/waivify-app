"use server";

import { db } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { z } from "zod";
import { v4 as uuidv4 } from "uuid";
import { getUserById, updateUser } from "./user";
import { trackEvent } from "@/lib/posthog/posthog.server";
import { getMaxCustomTemplatesByPlan } from "@/lib/waiverUsage";

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
      OR: [{ userId }, { isDefault: true }],
    },
    include: {
      UserTemplateSettings: {
        where: { userId },
        select: { calendlyUrl: true },
      },
    },
  });
  return templates.map((template) => ({
    ...template,
    calendlyUrl:
      template.UserTemplateSettings?.[0]?.calendlyUrl ||
      template.calendlyUrl ||
      "",
  }));
}
export async function getTemplateById(id: string) {
  return await db.template.findUnique({
    where: { id },
    include: {
      user: true,
    },
  });
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

  return templates;
}

export async function upsertTemplate(
  id: string | null,
  name: string,
  fields: any[],
  calendlyUrl: string
) {
  
  const { userId } = await auth();
  if (!userId) throw new Error("Not authenticated");

  if (id) {
    // If ID is provided, try to update
    const existing = await db.template.findUnique({ where: { id } });
    
    //  Prevent edits to default templates — clone instead
    if (existing?.isDefault) {
      return await db.template.create({
        data: {
          name: existing.name,
          fields: existing.fields ?? [],
          calendlyUrl,
          user: { connect: { clerkId: userId } },
          isDefault: false,
        },
      });
    }

    return await db.template.upsert({
      where: { id },
      update: {
        name,
        fields,
        calendlyUrl,
      },
      create: {
        name,
        fields,
        calendlyUrl,
        user: {
          connect: { clerkId: userId },
        },
        isDefault: false,
      },
    });
  } else {
    // No ID means we are **creating** a fresh template
    return await db.template.create({
      data: {
        name,
        fields,
        calendlyUrl,
        user: {
          connect: { clerkId: userId },
        },
        isDefault: false,
      },
    });
  }
}

export async function upsertUserTemplateSettings(
  templateId: string,
  calendlyUrl: string,
  clerkId: string
) {
  const user = await db.user.findUnique({
    where: { clerkId },
  });
  if (!user) throw new Error("User not found in DB");
  return await db.userTemplateSettings.upsert({
    where: {
      userId_templateId: {
        userId: user.id,
        templateId,
      },
    },
    update: {
      calendlyUrl,
    },
    create: {
      userId: user.id,
      templateId,
      calendlyUrl,
    },
  });
}
export async function getTemplateWithUserSettings(
  templateId: string,
  userId: string
) {
  const template = await db.template.findUnique({
    where: { id: templateId },
    include: {
      UserTemplateSettings: {
        where: { userId },
        select: { calendlyUrl: true },
      },
    },
  });

  if (!template) throw new Error("Template not found");

  // Override calendlyUrl if user has a custom one
  const effectiveCalendlyUrl =
    template.UserTemplateSettings[0]?.calendlyUrl || template.calendlyUrl;

  return {
    ...template,
    calendlyUrl: effectiveCalendlyUrl,
  };
}

// export async function createTemplate(name: string, fields: any) {
//   const { userId } = await auth();
//   if (!userId) throw new Error("Not authenticated");

//   const user = await getUserById();

//   // const currentCount = user?.Template.length;
//   const maxAllowed = getMaxCustomTemplatesByPlan(user?.plan as string);

//   if (Number(currentCount) >= maxAllowed) {
//     throw new Error("Template limit reached for your current plan.");
//   }

//   const template = await db.template.create({
//     data: {
//       name,
//       fields,
//       user: {
//         connect: { clerkId: userId },
//       },
//       isDefault: false,
//     },
//   });

//   return template;
// }

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
