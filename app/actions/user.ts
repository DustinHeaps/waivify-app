"use server";

import { db } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { Prisma, Template, User } from "@prisma/client";
import { nanoid } from "nanoid";

type UserWithTemplate = User & {
  Template?: Template | null;
};

export async function createUser({
  clerkId,
  email,
  name,
}: {
  clerkId: string;
  email: string;
  name?: string;
}) {
  try {
    const slug = `co-${nanoid(7)}`;

    const newUser = await db.user.upsert({
      where: { clerkId },
      create: {
        clerkId,
        email,
        slug: slug,
        lastActiveAt: new Date(),
        companyName: "",
        name: name || "",
        nextSteps: [],
      },
      update: {},
    });
    return newUser;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function updateUser(
  clerkId: string,
  data: Prisma.UserUpdateInput
) {
  try {
    await db.user.update({
      where: { clerkId },
      data,
    });
  } catch (err) {
    console.error("❌ Failed to update user:", err);
  }
}

export async function getUserById() {
  const { userId } = await auth();
  if (!userId) return null;

  try {
    const user = await db.user.findUnique({
      include: {
        Template: true,
      },
      where: { clerkId: userId as string },
    });

    return user;
  } catch (error) {
    console.error("Failed to get user by ID:", error);
    return null;
  }
}

export async function getUserBySlug(
  slug: string
): Promise<UserWithTemplate | null> {
  // const normalizedSlug = slug.replace(/\s+/g, "-").toLowerCase();

  try {
    const user = await db.user.findFirst({
      where: { slug: slug },
    });

    if (!user?.publicTemplateId) return user;

    const template = await db.template.findFirst({
      where: {
        id: user.publicTemplateId,
      },
    });

    return {
      ...user,
      Template: template,
    };

    // try {
    //   const user = await db.user.findFirst({
    //     where: { slug: normalizedSlug },

    //     include: {
    //       Template: {
    //         orderBy: [{ createdAt: "desc" }],
    //         take: 1,
    //         where: {
    //           fields: {
    //             not: [],
    //           },
    //         },
    //       },
    //     },
    //   });
    //   return user;
  } catch (error) {
    console.error("Failed to get user by Slug:", error);
    return null;
  }
}
export async function resetMonthlyWaiverCounts() {
  const now = new Date();

  const users = await db.user.findMany({
    where: {
      plan: { in: ["starter"] },
      renewalDate: {
        not: null,
      },
    },
  });

  let resetCount = 0;

  for (const user of users) {
    const last = user.renewalDate ?? new Date(0);
    const diffInDays = (now.getTime() - last.getTime()) / (1000 * 60 * 60 * 24);

    if (diffInDays >= 30) {
      await db.user.update({
        where: { id: user.id },
        data: {
          waiverCount: 0,
          renewalDate: now,
        },
      });
      resetCount++;
    }
  }

  console.log(`✅ Reset ${resetCount} users based on rolling 30-day period`);
  return resetCount;
}
