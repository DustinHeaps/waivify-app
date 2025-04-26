"use server";

import { db } from "../../lib/prisma.js";

export async function pingDb() {
  try {
    await db.$queryRaw`SELECT 1`;
    return { status: "Connected" };
  } catch (error) {
    console.error("DB Ping Error:", error);
    return { status: "Error" };
  }
}
