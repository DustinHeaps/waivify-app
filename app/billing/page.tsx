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
        setError("Could not open Stripe portal.");
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
        "Add logo, Company name, and QR code",
        "Email confirmations",
      ],
    },
    {
      id: "starter",
      name: "Starter",
      price: "$12/mo",
      preface: "Everything in Free, plus:",
      features: [
        "Everything in Free, plus:",
        "50 waivers/month",
        "Download PDFs",
        "Access to waiver table (search, filter, archive, delete, export)",
      ],
    },
    {
      id: "pro",
      name: "Pro",
      price: "$29/mo",
      preface: "Everything in Starter, plus:",
      features: [
        "Unlimited waivers",
        "Remove Watermark",
        "Access to Advanced Analytics",
        "Priority support",
      ],
    },
  ];

  return (
    <div className='max-w-screen-md mx-auto px-4 sm:px-6 py-6 space-y-6'>
      <div className='space-y-1'>
        <h1 className='text-xl font-semibold'>Billing & Subscription</h1>
        <p className='text-muted-foreground text-sm'>
          Manage your current plan or upgrade for more features.
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
          <CardContent className='p-5  space-y-3'>
            <h2 className='font-medium'>
              {p.name} - {p.price}
            </h2>
            {p.preface && (
              <p className='text-sm text-gray-500 font-medium mb-1'>
                {p.preface}
              </p>
            )}
            <ul className='text-sm text-muted-foreground space-y-1'>
              {p.features.map((f) => (
                <li key={f}>✅ {f}</li>
              ))}
            </ul>

            {plan === p.id ? (
              <span className='inline-block mt-2 rounded-full bg-green-100 text-green-700 text-xs font-medium px-3 py-1'>
                Current Plan
              </span>
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
};
