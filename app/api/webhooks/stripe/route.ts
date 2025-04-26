import { NextResponse } from "next/server";
import Stripe from "stripe";

import { updateUser } from "@/app/actions/user";
import { db } from "@/lib/prisma";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-02-24.acacia",
});

export async function POST(req: Request) {
  const sig = req.headers.get("stripe-signature")!;
  const body = await req.text();

  let event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err) {
    return new NextResponse(`Webhook Error: ${(err as Error).message}`, {
      status: 400,
    });
  }

  const session = event.data.object as Stripe.Checkout.Session;
  let customerId: string;

  switch (event.type) {
    case "checkout.session.completed":
      // ✅ Get user ID from metadata (you pass it when creating checkout session)
      const clerkId = session.metadata?.userId;

      customerId = session.customer as string;

      if (!clerkId) {
        console.error("Missing userId in metadata");
        return NextResponse.json({ received: true });
      }

      // ✅ Determine plan based on Stripe price ID
      const lineItems = await stripe.checkout.sessions.listLineItems(
        session.id
      );
      const priceId = lineItems.data[0]?.price?.id || session.metadata?.priceId;

      const plan =
        priceId === process.env.STRIPE_PRO_PRICE_ID ? "pro" : "starter";

      const subscription = await stripe.subscriptions.retrieve(
        session.subscription as string
      );

      const renewalDate = new Date(subscription.current_period_end * 1000);

      await updateUser(clerkId, {
        plan,
        renewalDate,
        stripeCustomerId: customerId,
      });

      break;

    case "customer.subscription.updated":
      const sub = event.data.object as any;

      if (sub.cancel_at_period_end) {
        const customerId = sub.customer;

        const user = await db.user.findFirst({
          where: { stripeCustomerId: customerId },
        });

        if (user) {
          await updateUser(user.clerkId, { plan: "free", renewalDate: null });
        }
      }
      break;
    case "customer.subscription.deleted":
      // ✅ Downgrade on cancel
      customerId = (event.data.object as any).customer;

      const user = await db.user.findFirst({
        where: { stripeCustomerId: customerId },
      });

      if (user) {
        await updateUser(user.clerkId, { plan: "free", renewalDate: null });
      }
      break;

    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  return NextResponse.json({ received: true });
}
