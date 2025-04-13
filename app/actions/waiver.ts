"use server";

import { trackEvent } from "@/lib/posthog/posthog.server";
import { v4 as uuidv4 } from "uuid";
import { z } from "zod";
import jwt from "jsonwebtoken";
import { db } from "@/lib/prisma";

import { headers } from "next/headers";
import { getUserById } from "./user";
import { incrementWaiverUsage } from "@/lib/waiverUsage";
import { auth } from "@clerk/nextjs/server";

const WaiverSchema = z.object({
  name: z.string().optional(),
  ipAddress: z.string(),
  signatureId: z.string().optional(),
  terms: z.boolean(),
  liability: z.boolean(),
  date: z.string().transform((val) => new Date(val)),
  templateId: z.string(),
  fields: z.record(z.any()),
});

export async function saveWaiver(data: unknown, slug: string) {
  const { userId } = await auth();
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
  const business = await db.user.findFirst({
    where: { slug: slug },
  });

  if (!business) {
    throw new Error("Business not found for this slug");
  }
  const waiver = await db.waiver.create({
    data: {
      ...waiverData,
      ipAddress: ip,
      id,
      token,
      userId: business.id,
      templateId: waiverData.templateId,
      fields: waiverData.fields,
      // slug: waiverData.slug
    },
  });

  await trackEvent({
    event: "waiver_saved",
    distinctId: waiver.id,
  });
  await incrementWaiverUsage(userId as string);
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

export async function getAllWaiversByUser({
  archived = false,
}: {
  archived: boolean;
}) {
  const user = await getUserById();

  try {
    const waivers = await db.waiver.findMany({
      orderBy: { date: "desc" },
      include: {
        signature: true,
      },
      where: { archived, userId: user?.id },
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

export async function archiveWaivers(ids: string[], unarchive = false) {
  try {
    await db.waiver.updateMany({
      where: {
        id: { in: ids },
      },
      data: {
        archived: !unarchive,
      },
    });

    return { success: true };
  } catch (error) {
    console.error("Archive error:", error);
    return { success: false };
  }
}

export async function deleteWaivers(ids: string[]) {
  try {
    await db.waiver.deleteMany({
      where: { id: { in: ids } },
    });

    // revalidatePath("/dashboard");

    return { success: true };
  } catch (error) {
    console.error("Failed to delete waivers:", error);
    return { success: false };
  }
}
