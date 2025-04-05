"use server";

import { updateUser } from "@/app/actions/user";
import { auth } from "@clerk/nextjs/server";

export async function SaveButton(data: { name: string; logo: string }) {
  const { userId } = await auth();
  if (!userId) throw new Error("Not authenticated");

  await updateUser(userId, {
    companyName: data.name,
    logoUrl: data.logo,
  });

  return { success: true };
}
