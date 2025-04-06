"use server";

import { trackEvent } from "@/lib/posthog/posthog.server";
import { v4 as uuidv4 } from "uuid";
import { z } from "zod";
import jwt from "jsonwebtoken";
import { db } from "@/lib/prisma";
import { getSignatureById } from "./signature";
import { headers } from "next/headers";

import WaiverConfirmationEmail from "../waiver/components/WaiverConfirmationEmail";
import { Resend } from "resend";
import { getUserById } from "./user";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

const resend = new Resend(process.env.RESEND_API_KEY);

const WaiverSchema = z.object({
  name: z.string(),
  ipAddress: z.string(),
  signatureId: z.string().optional(),
  terms: z.boolean(),
  liability: z.boolean(),
  date: z.string().transform((val) => new Date(val)),
});



export async function saveWaiver(data: unknown) {
  const forwardedFor = (await headers()).get("x-forwarded-for");
  const ip = forwardedFor?.split(",")[0] ?? "Unknown";

  const id = uuidv4();

  const token = jwt.sign({ waiverId: id }, process.env.JWT_SECRET as string);

  const parsed = WaiverSchema.safeParse(data);
  if (!parsed.success) {
    console.error("Zod error:", parsed.error.flatten());
    throw new Error("Invalid form data");
  }

  const waiverData = parsed.data;

  if (!parsed.success) {
    throw new Error("Invalid form data");
  }

  const waiver = await db.waiver.create({
    data: {
      ...waiverData,
      ipAddress: ip,
      id,
      token,
    },
  });

  await trackEvent({
    event: "waiver_saved",
    distinctId: waiver.id,
  });

  return waiver;
}

export async function getAllWaivers() {
  try {
    const waivers = await db.waiver.findMany({
      orderBy: { date: "desc" },
      include: {
        signature: true,
      },
      where: { archived: false },
    });

    return waivers;
  } catch (error) {
    console.error("Failed to fetch waivers:", error);
    throw new Error("Could not fetch waivers");
  }
}

export async function getWaiverById(waiverId: string) {
  try {
    const waiver = await db.waiver.findUnique({
      where: { id: waiverId },
    });

    await trackEvent({
      event: "waiver_retrieved",
      distinctId: waiverId,
    });
    return waiver;
  } catch (error) {
    console.error("[getWaiverById]", error);
    return null;
  }
}

export async function sendEmail(id: string, waiverId: string) {
  const { userId } = await auth();

  if (!userId) throw new Error("Unauthorized");

  const user = await getUserById();
  if (!user) throw new Error("User not found");

  const email = user.email;

  const signature = await getSignatureById(id);
  if (!signature) throw new Error("Signature not found");

  const response = await resend.emails.send({
    from: process.env.EMAIL_FROM as string,
    to: email, // user's email
    subject: "✅ Waiver Confirmation",
    react: WaiverConfirmationEmail({
      name: signature.name,
      id,
      date: signature.uploadedAt.toISOString(),
      waiverId,
    }),
  });
  if (response.error) {
    console.error("Resend failed:", response.error);
    throw new Error("Email send failed");
  }
  return { status: "success" };
}

export async function markWaiverViewed(waiverId?: string) {
  if (!waiverId) {
    await trackEvent({
      event: "waiver_viewed",
      distinctId: "server",
    });

    return { success: false };
  }

  await db.waiver.update({
    where: { id: waiverId },
    data: { viewedAt: new Date() },
  });

  return { success: true };
}

export async function getWaiverByToken(token: string) {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as {
      waiverId: string;
    };

    const waiver = await db.waiver.findUnique({
      where: { id: decoded.waiverId },
    });

    return waiver;
  } catch (error) {
    console.error("[getWaiverByToken]", error);
    return null;
  }
}

export async function archiveWaivers(ids: string[]) {
  await db.waiver.updateMany({
    where: { id: { in: ids } },
    data: { archived: true },
  });
}

export async function deleteWaivers(ids: string[]) {
  try {
    await db.waiver.deleteMany({
      where: { id: { in: ids } },
    });

    revalidatePath("/dashboard");

    return { success: true };
  } catch (error) {
    console.error("Failed to delete waivers:", error);
    return { success: false };
  }
}
