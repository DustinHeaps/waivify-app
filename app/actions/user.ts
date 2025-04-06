"use server";

import { db } from "@/lib/prisma";
import { auth } from '@clerk/nextjs/server';
import { Prisma } from "@prisma/client";
import { subMonths } from "date-fns";

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
        lastActiveAt: new Date(),
        companyName: "",
        name: name || "",
        nextSteps: [
          { id: "1", completed: false },
          { id: "2", completed: false },
          { id: "3", completed: false },
          { id: "4", completed: false },
          { id: "5", completed: false },
          { id: "6", completed: false },
          { id: "7", completed: false },
          { id: "8", completed: false },
          { id: "9", completed: false, current: 0, goal: 10 },
          { id: "10", completed: false, current: 0, goal: 25 },
          { id: "11", completed: false, current: 0, goal: 50 },
          { id: "12", completed: false, current: 0, goal: 100 },
        ],
      },
      update: {},
    });
    return newUser;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
// export async function updateUser(
//   clerkId: string,
//   data: Partial<{
//     logoUrl: string;
//     plan: string;
//     waiverCount: number;
//     feedbackGiven: boolean;
//     nextSteps: any;
//     stripeCustomerId: string;
//     companyName: string;
//     renewalDate: Date
//   }>
// ) {
// console.log('DATA - ',data)
//   await db.user.update({
//     where: { clerkId },
//     data,
//   });
// }

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

export async function resetMonthlyWaiverCounts() {
  const oneMonthAgo = subMonths(new Date(), 1);

  const result = await db.user.updateMany({
    where: {
      plan: "free",
      lastActiveAt: { gte: oneMonthAgo },
    },
    data: {
      waiverCount: 0,
    },
  });

  console.log(`✅ Reset ${result.count} active free users`);

  return result.count;
}
