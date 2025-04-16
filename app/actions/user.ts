"use server";

import { db } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { Prisma } from "@prisma/client";

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
    const newUser = await db.user.upsert({
      where: { clerkId },
      create: {
        clerkId,
        email,
        slug: "",
        lastActiveAt: new Date(),
        companyName: "",
        name: name || "",
        nextSteps: [],
      },
      update: {},
    });
    return newUser;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function updateUser(
  clerkId: string,
  data: Prisma.UserUpdateInput
) {
  console.log("🔧 Updating user with data:", data);

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
  try {
    const user = await db.user.findUnique({
      where: { clerkId: userId as string },
    });

    return user;
  } catch (error) {
    console.error("Failed to get user by ID:", error);
    return null;
  }
}
export async function getUserBySlug(slug: string) {
  const normalizedSlug = slug.replace(/\s+/g, "-").toLowerCase();

  try {
    const user = await db.user.findFirst({
      where: { slug: normalizedSlug },
      include: {
        Template: {
          orderBy: [{ createdAt: "desc" }],
          take: 1,
          where: {
            fields: {
              not: [],
            },
          },
        },
      },
    });
    return user;
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
