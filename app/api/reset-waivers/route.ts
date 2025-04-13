import { resetMonthlyWaiverCounts } from "@/app/actions/user";
import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  const secret = req.headers.get("cron-secret");
  const url = new URL(req.url);
  const force = url.searchParams.get("force") === "1";
  if (!force && secret !== process.env.CRON_SECRET) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const count = await resetMonthlyWaiverCounts();

    // ✅ Success email
    await resend.emails.send({
      from: "no-reply@waivify.com",
      to: "dustinheaps89@gmail.com",
      subject: "✅ Waivify Waiver Reset Completed",
      html: `<p>✅ Successfully reset ${count} free users on ${new Date().toLocaleString()}</p>`,
    });

    console.log(`✅ Cron Success | Reset ${count} users`);

    return new Response("Reset successful + Email Sent");
  } catch (err: any) {
    console.error("❌ Cron Failed", err);

    // ❌ Failure email
    await resend.emails.send({
      from: "no-reply@waivify.com",
      to: "dustinheaps89@gmail.com",
      subject: "❌ Waivify Waiver Reset Failed",
      html: `<p>Waiver reset failed at ${new Date().toLocaleString()}</p><pre>${err.message}</pre>`,
    });

    return new Response("Reset failed", { status: 500 });
  }
}
