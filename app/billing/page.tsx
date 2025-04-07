"use client";

import { useEffect, useState, useTransition } from "react";
import { useUser } from "@clerk/nextjs";
import {
  checkout,
  createCustomerPortalSession,
  getPaymentMethod,
} from "../actions/stripe";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { getUserById } from "../actions/user";

export default function BillingPage() {
  const [plan, setPlan] = useState<"free" | "starter" | "pro">("free");
  const [isPending, startTransition] = useTransition();
  const [loadingPlan, setLoadingPlan] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [card, setCard] = useState<any>(null);
  const { user } = useUser();

  useEffect(() => {
    if (!user?.id) return;
    (async () => {
      try {
        const dbUser = await getUserById();
        setPlan((dbUser?.plan as "free" | "starter" | "pro") || "free");

        if (dbUser?.stripeCustomerId) {
          const res = await getPaymentMethod(dbUser.stripeCustomerId);
          setCard(res?.card);
        }
      } catch {
        setError("Unable to load plan details.");
      }
    })();
  }, [user?.id]);

  const handleSubscribe = async (selected: "starter" | "pro") => {
    setError(null);
    setLoadingPlan(selected);
    try {
      await checkout({ userId: user?.id, plan: selected } as any);
    } catch (err: any) {
      setError(err.message || "Something went wrong.");
    } finally {
      setLoadingPlan(null);
    }
  };

  const handleManageSubscription = () => {
    startTransition(async () => {
      try {
        const url = await createCustomerPortalSession();
        if (url) window.location.href = url;
      } catch {
        setError("Could not open Stripe portal.");
      }
    });
  };

  const plans = [
    {
      id: "starter",
      name: "Starter",
      price: "$9/mo",
      features: ["50 waivers/month", "1 team member", "Download PDFs"],
    },
    {
      id: "pro",
      name: "Pro",
      price: "$29/mo",
      features: [
        "Unlimited waivers",
        "Up to 5 team members",
        "Custom branding",
        "Priority support",
      ],
    },
  ];

  return (
    <div className='max-w-screen-md mx-auto py-10 space-y-6'>
      <div className='space-y-1'>
        <h1 className='text-xl font-semibold'>Billing & Subscription</h1>
        <p className='text-muted-foreground text-sm'>
          Manage your current plan or upgrade for more features.
        </p>
      </div>

      {error && (
        <div className='text-sm text-red-500 border border-red-300 bg-red-50 rounded p-3'>
          {error}
        </div>
      )}
      {card && (
        <div className='border border-gray-200 rounded px-4 py-3 bg-gray-50 mb-4'>
          <div className='text-sm text-muted-foreground'>
            <p>
              💳 {card.brand.toUpperCase()} ending in {card.last4}
            </p>
            <p>
              Expires {card.exp_month}/{card.exp_year}
            </p>
          </div>
        </div>
      )}
      {plans.map((p) => (
        <Card key={p.id}>
          <CardContent className='p-5 space-y-3'>
            <h2 className='font-medium'>
              {p.name} - {p.price}
            </h2>
            <ul className='text-sm text-muted-foreground space-y-1'>
              {p.features.map((f) => (
                <li key={f}>✅ {f}</li>
              ))}
            </ul>

            {plan === p.id ? (
              <Badge variant='outline' className='mt-2'>
                Current Plan
              </Badge>
            ) : (
              <Button
                disabled={!!loadingPlan}
                onClick={() => handleSubscribe(p.id as "starter" | "pro")}
              >
                {loadingPlan === "starter"
                  ? "Redirecting..."
                  : plan === "pro"
                    ? "Switch to Starter"
                    : "Get Starter"}
              </Button>
            )}
          </CardContent>
        </Card>
      ))}

      <div className='pt-4'>
        <Button
          onClick={handleManageSubscription}
          disabled={isPending}
          variant='outline'
        >
          {isPending ? "Opening Portal..." : "Manage Subscription in Stripe"}
        </Button>
      </div>
    </div>
  );
}
