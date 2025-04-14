"use server";

import { auth, currentUser } from '@clerk/nextjs/server';
import { Resend } from 'resend';
import { getUserById } from './user';
import { getSignatureById } from './signature';
import WaiverConfirmationEmail from '../waiver/components/WaiverConfirmationEmail';
import { trackEvent } from '@/lib/posthog/posthog.server';

const resend = new Resend(process.env.RESEND_API_KEY);

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

  await trackEvent({
    event: "waiver_email_sent",
    distinctId: id,
  });
  return { status: "success" };
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
      to: "dustinheaps89@gmail.com", // 👈 where you want the feedback
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
