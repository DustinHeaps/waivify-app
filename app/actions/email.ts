"use server";

import { auth, currentUser } from "@clerk/nextjs/server";
import { Resend } from "resend";
import { getUserById } from "./user";
import { getSignatureById } from "./signature";
import WaiverConfirmationEmail from "../waiver/components/WaiverConfirmationEmail";
import { trackEvent } from "@/lib/posthog/posthog.server";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendEmail(id: string, waiverId: string, email: string) {
  const signature = await getSignatureById(id);
  if (!signature) throw new Error("Signature not found");

  if (!email || !email.includes("@")) {
    throw new Error("Invalid email address.");
  }

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

  await trackEvent({
    event: "waiver_email_sent",
    distinctId: id,
  });
  return { status: "success" };
}

export async function sendSupportEmail({
  name,
  email,
  message,
  subject,
}: {
  name: string;
  email: string;
  message: string;
  subject: string;
}) {
  try {
    await resend.emails.send({
      from: "support@waivify.com",
      to: "dustinheaps89@gmail.com",
      subject: "📝 New Waivify Support",
      replyTo: email,
      html: `
      <p><strong>From:</strong> ${name} (${email})</p>
      <p><strong>Message:</strong></p>
      <p>${message}</p>
    `,
    });

    return { success: true };
  } catch (err) {
    console.error("Support send error:", err);
    return { success: false, error: "Something went wrong." };
  }
}

export async function submitFeedback(message: string) {
  const user = await currentUser();
  const email = user?.emailAddresses[0]?.emailAddress;
  const name = user?.fullName || "Unknown User";

  if (!message || message.length < 3) {
    return { success: false, error: "Message too short." };
  }

  try {
    await resend.emails.send({
      from: "feedback@waivify.com",
      to: "dustinheaps89@gmail.com",
      subject: "📝 New Waivify Feedback",
      html: `
        <p><strong>From:</strong> ${name} (${email})</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `,
    });

    return { success: true };
  } catch (err) {
    console.error("Feedback send error:", err);
    return { success: false, error: "Something went wrong." };
  }
}
