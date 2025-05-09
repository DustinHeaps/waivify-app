import { resetMonthlyWaiverCounts } from "@/app/actions/user";
import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {

  const authHeader = req.headers.get("authorization");
  const url = new URL(req.url);
  const force = url.searchParams.get("force") === "1";

if (!force && authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const count = await resetMonthlyWaiverCounts();

    // ✅ Success email
    await resend.emails.send({
      from: "no-reply@waivify.com",
      to: "dustinheaps89@gmail.com",
      subject: "✅ Waivify Waiver Reset Completed",
      html: `<p>✅ Successfully reset ${count} users on ${new Date().toLocaleString()}</p>`,
    });

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

export async function GET(req: Request) {
  return await POST(req);
}