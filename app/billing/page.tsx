"use client";

import { Suspense, useEffect, useState, useTransition } from "react";
import { useUser } from "@clerk/nextjs";
import {
  checkout,
  createCustomerPortalSession,
  getPaymentMethod,
} from "../actions/stripe";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { getUserById } from "../actions/user";
import { useRouter, useSearchParams } from "next/navigation";

import { posthog } from "posthog-js";

type Plan = {
  id: "free" | "starter" | "pro";
  name: string;
  features: string[];
  preface?: string;
  price: string;
};

export default function BillingPage() {
  return (
    <Suspense fallback={null}>
      <BillingPageContent />
    </Suspense>
  );
}

const BillingPageContent = () => {
  const [plan, setPlan] = useState<"free" | "starter" | "pro">("free");
  const [isPending, startTransition] = useTransition();
  const [loadingPlan, setLoadingPlan] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [card, setCard] = useState<any>(null);
  const { user } = useUser();
  const router = useRouter();
  const searchParams = useSearchParams();
  const success = searchParams.get("success");
  const canceled = searchParams.get("canceled");

  useEffect(() => {
    if (success || canceled) {
      const timeout = setTimeout(() => {
        router.replace("/billing");
      }, 3000); // clears after 3 seconds
      return () => clearTimeout(timeout);
    }
  }, [success, canceled, router]);

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

  const handleSubscribe = async (selected: "free" | "starter" | "pro") => {
    posthog.capture("clicked_upgrade_button", {
      plan: selected,
    });
    setLoadingPlan(selected);
    if (selected === "free") {
      handleManageSubscription();
    } else {
      setError(null);

      try {
        await checkout({ userId: user?.id, plan: selected } as any);
      } catch (err: any) {
        setError(err.message || "Something went wrong.");
      } finally {
        setLoadingPlan(null);
      }
    }
  };

  const handleManageSubscription = () => {
    startTransition(async () => {
      try {
        const url = await createCustomerPortalSession();
        if (url) window.location.href = url;
      } catch {
        setError("Could not open Stripe, please try again.");
      }
    });
  };

  const plans: Plan[] = [
    {
      id: "free",
      name: "Free",
      price: "$0/mo",

      features: [
        "10 total waivers",
        "Use default templates",
        "Email confirmations",
        "Mobile Signing",
        "Basic dashboard access (view, download, archive, delete)",
      ],
    },
    {
      id: "starter",
      name: "Starter",
      price: "$12/mo",
      preface: "Everything in Free, plus:",
      features: [
        "50 waivers/month",
        "1 saved waiver template",
        "Email support",
        "Advanced dashboard tools (search, filter, export, full history)",
      ],
    },
    {
      id: "pro",
      name: "Pro",
      price: "$29/mo",
      preface: "Everything in Starter, plus:",
      features: [
        "Unlimited waivers",
        "White-labeled waivers (no Waivify branding)",
        "5 Custom templates",
        "Calendly Integration",
        "Priority support",
        "Access to advanced analytics",
      ],
    },
  ];

  return (
    <div className='max-w-screen-md mx-auto px-4 sm:px-6 py-6 space-y-6'>
      <div className='space-y-1 text-center'>
        <h1 className='text-3xl font-bold text-gray-900 dark:text-white'>
          Simple, transparent billing
        </h1>
        <p className='text-sm text-muted-foreground'>
          No contracts. Cancel anytime.
        </p>
      </div>

      {/* ✅ Feedback Banner */}
      {success && (
        <div className='rounded-lg border border-green-500 bg-green-50 p-4 text-center'>
          <h2 className='text-lg font-semibold text-green-600'>
            ✅ Payment Successful!
          </h2>
          <p className='text-sm text-green-700 mt-1'>
            Your account has been upgraded.
          </p>
        </div>
      )}

      {canceled && (
        <div className='rounded-lg border border-red-500 bg-red-50 p-4 text-center'>
          <h2 className='text-lg font-semibold text-red-600'>
            ❌ Checkout Canceled
          </h2>
          <p className='text-sm text-red-700 mt-1'>
            You can try again anytime.
          </p>
        </div>
      )}

      {error && (
        <div className='text-sm text-red-500 border border-red-300 bg-red-50 rounded p-3'>
          {error}
        </div>
      )}
      {card && (
        <div className='border border-muted rounded-lg px-4 py-3 bg-muted/30 mb-6 text-sm text-muted-foreground'>
          <div className='text-sm text-muted-foreground border rounded-md p-3 bg-muted'>
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
          <CardContent className='p-6  space-y-4'>
            <div className='space-y-1'>
              <h2 className='text-lg font-semibold text-gray-900 dark:text-white'>
                {p.name}
              </h2>
              <p className='text-sm text-muted-foreground'>{p.price}</p>
            </div>
            {p.preface && (
              <p className='text-sm text-muted-foreground font-medium'>
                {p.preface}
              </p>
            )}
            <ul className='text-sm text-muted-foreground space-y-1'>
              {p.features.map((f) => (
                <li key={f}>✅ {f}</li>
              ))}
            </ul>

            {plan === p.id ? (
              <div className='text-sm font-medium text-green-700 border border-green-200 bg-green-50 px-2 py-1 w-fit'>
                You’re on this plan
              </div>
            ) : (
              <Button
                disabled={!!loadingPlan}
                onClick={() => handleSubscribe(p.id as "starter" | "pro")}
              >
                {loadingPlan === p.id
                  ? "Redirecting..."
                  : plan === p.id
                    ? "Current Plan"
                    : plan !== "free" && p.id === "free"
                      ? "Switch to Free"
                      : plan === "free" && p.id === "pro"
                        ? "Get Pro"
                        : plan === "pro" && p.id === "starter"
                          ? "Switch to Starter"
                          : p.id === "starter"
                            ? "Get Starter"
                            : "Upgrade to Pro"}
              </Button>
            )}
          </CardContent>
        </Card>
      ))}

      <div className='pt-6 text-center'>
        <Button
          onClick={handleManageSubscription}
          disabled={isPending}
          variant='outline'
          className='w-full sm:w-auto'
        >
          {isPending ? "Opening Stripe..." : "Manage Subscription in Stripe"}
        </Button>
      </div>
    </div>
  );
};
