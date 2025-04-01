"use server";

import { trackEvent } from "@/lib/posthog/posthog.server";
import { v4 as uuidv4 } from "uuid";
import { z } from "zod";
import jwt from "jsonwebtoken";
import { db } from "@/lib/prisma";
import { getSignatureById } from "./signature";
import { auth } from "@clerk/nextjs/dist/types/server";

const WaiverSchema = z.object({
  name: z.string(),
  ipAddress: z.string().default("0.0.0.0"),
  signatureId: z.string().optional(),
  terms: z.boolean(),
  liability: z.boolean(),
  date: z.string().transform((val) => new Date(val)),
});

export async function saveWaiver(data: unknown) {
  console.log("Incoming data:", data);

  const id = uuidv4();

  const token = jwt.sign({ waiverId: id }, process.env.JWT_SECRET as string);

  const waiverInput = data as {
    name: string;
    ipAddress?: string;
    signatureId?: string;
    terms: boolean;
    liability: boolean;
    token: string;
  };

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

export async function log404(path: string) {
  trackEvent({
    event: "404_page_view",
    distinctId: "server",
    properties: {
      path,
    },
  });
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

// export async function sendEmail(id: string, waiverId: string) {
//   const { userId } =  await auth();
//   if (!userId) throw new Error("Unauthorized");

//   const user = await clerkClient.users.getUser(userId);
//   const email = user.emailAddresses[0].emailAddress;

//   const signature = await getSignatureById(id);
//   if (!signature) throw new Error("Signature not found");

//   const response = await resend.emails.send({
//     from: process.env.EMAIL_FROM as string,
//     to: email, // user's email
//     subject: "✅ Waiver Confirmation",
//     react: WaiverConfirmationEmail({
//       name: signature.name,
//       id,
//       date: signature.uploadedAt.toISOString(),
//       waiverId,
//     }),
//   });

//   await trackEvent({
//     event: "waiver_email_sent",
//     distinctId: id,
//   });

//   return { status: "success" };
// }
