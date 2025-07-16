"use server";

import { db } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { string, z } from "zod";
import { v4 as uuidv4 } from "uuid";
import { getUserById, updateUser } from "./user";
import { trackEvent } from "@/lib/posthog/posthog.server";
import { getMaxCustomTemplatesByPlan } from "@/lib/waiverUsage";
import { XOctagon } from "lucide-react";

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

  });

  const filtered = templates.filter((template) => {
    return !(template.isDefault && template.userId === userId);
  });

  const userTemplates = filtered.filter((template, _, self) => {
    if (!template.isDefault) return true;
  
    const hasUserVersion = self.some(
      (t) =>
        t.name === template.name &&
        t.isDefault &&
        t.userId !== null
    );
  
    // If this one has no userId and another version does, skip it
    if (template.userId === null && hasUserVersion) return false;
  
    return true;
  });


  return userTemplates;
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
  templateId: string | null,
  name: string,
  fields: any[],
  calendlyUrl: string,
  userId: string,
  clerkId: string
) {
  if (!clerkId) throw new Error("Not authenticated");

  if (templateId) {
    // If ID is provided, try to update
    const allExistingTemplates = await db.template.findMany({
      where: { name },
    });
    
    const userTemplateArray = allExistingTemplates.filter(
      (template) => template.userId === userId
    );

    const existingUserTemplate = userTemplateArray[0];
    
    if (existingUserTemplate?.isDefault === false) {
      // update the users custom template
      return await db.template.upsert({
        where: { id: templateId },
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
            connect: { clerkId },
          },
          isDefault: false,
        },
      });
    } else if (existingUserTemplate) {
      //  Update the cloned default template.
      return await db.template.update({
        where: { id: existingUserTemplate.id },
        data: {
          name: existingUserTemplate.name,
          fields: existingUserTemplate.fields ?? [],
          calendlyUrl,
          user: { connect: { clerkId } },
          isDefault: true,
          description: existingUserTemplate.description,
        },
      });
    } else {
      return await db.template.create({
        // Create a clone of the default tmeplate
        data: {
          name: allExistingTemplates[0]?.name as string,
          fields: allExistingTemplates[0]?.fields ?? [],
          calendlyUrl,
          user: { connect: { clerkId } },
          isDefault: true,
          description: allExistingTemplates[0]?.description,
        },
      });
    }
  } else {
    // No ID means we are **creating** a fresh template
    return await db.template.create({
      data: {
        name,
        fields,
        calendlyUrl,
        user: {
          connect: { clerkId },
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
