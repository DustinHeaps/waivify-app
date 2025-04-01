"use server";

import Stripe from "stripe";
import { redirect } from "next/navigation";


const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2025-02-24.acacia",
});

export async function checkout({
  userId,
  plan,
}: {
  userId: string;
  plan: "starter" | "pro";
}) {
  const priceId =
    plan === "starter" ? process.env.STRIPE_STARTER_PRICE_ID! : process.env.STRIPE_PRO_PRICE_ID!;
  console.log("Plan", plan);
  if (!priceId) {
    console.error("Missing Stripe Price ID for plan:", plan);
    throw new Error("Missing Stripe Price ID for plan: " + plan);
  }

  const session = await stripe.checkout.sessions.create({
    mode: "subscription",
    payment_method_types: ["card"],
    line_items: [{ price: priceId, quantity: 1 }],
    success_url: `${process.env.NEXT_PUBLIC_APP_URL}/account?success=1`,
    cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/account?canceled=1`,
    metadata: { userId, plan },
  });

  redirect(session.url!);
}
