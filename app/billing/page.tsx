"use client";

import { useEffect, useState, useTransition } from "react";
import { useUser } from "@clerk/nextjs";
import { checkout, createCustomerPortalSession } from "../actions/stripe";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { getUserById } from "../actions/user";

export default function BillingPage() {
  const [currentPlan, setCurrentPlan] = useState<
    "free" | "starter" | "pro" | undefined
  >("free");

  const [isPending, startTransition] = useTransition();
  const { user } = useUser();

  const [loadingPlan, setLoadingPlan] = useState<string | null>(null);

  const [error, setError] = useState<string | null>(null);

  const handleSubscribe = async (plan: "starter" | "pro") => {
    try {
      setError(null);
      setLoadingPlan(plan);
      await checkout({ userId: user?.id, plan } as any);
    } catch (err: any) {
      setError(err.message || "Something went wrong.");
      setLoadingPlan(null);
    }
  };

  const handleManageSubscription = () => {
    startTransition(async () => {
      try {
        const url = await createCustomerPortalSession();
        if (url) window.location.href = url;
      } catch (err) {
        console.error("Error:", err);
        setError("Failed to open Stripe portal. Try again.");
      }
    });
  };

  useEffect(() => {
    if (user?.id) {
      (async () => {
        try {
          const dbUser = await getUserById();
          setCurrentPlan(
            (dbUser?.plan as "free" | "starter" | "pro") || "free"
          );
        } catch (err) {
          setError("Failed to load billing info");
        }
      })();
    }
  }, [user?.id]);

  return (
    <div className='max-w-screen-md mx-auto py-10 space-y-6'>
      <div className='space-y-1'>
        <h1 className='text-xl font-semibold'>Choose your plan</h1>
        <p className='text-muted-foreground text-sm'>
          Upgrade or manage your subscription.
        </p>
      </div>

      {error && (
        <div className='text-sm text-red-500 border border-red-300 rounded p-2'>
          {error}
        </div>
      )}

      {/* Starter Plan */}
      <Card>
        <CardContent className='p-5 space-y-3'>
          <h2 className='font-medium'>Starter - $9/mo</h2>
          <ul className='text-sm text-muted-foreground space-y-1'>
            <li>✅ 50 waivers/month</li>
            <li>✅ 1 team member</li>
            <li>✅ Download PDFs</li>
          </ul>
          {currentPlan === "starter" ? (
            <Badge variant='outline' className='mt-2'>
              Current Plan
            </Badge>
          ) : (
            <Button
              disabled={!!loadingPlan}
              onClick={() => handleSubscribe("starter")}
            >
              {loadingPlan === "starter" ? "Redirecting..." : "Get Starter"}
            </Button>
          )}
        </CardContent>
      </Card>

      {/* Pro Plan */}
      <Card>
        <CardContent className='p-5 space-y-3'>
          <h2 className='font-medium'>Pro - $29/mo</h2>
          <ul className='text-sm text-muted-foreground space-y-1'>
            <li>✅ Unlimited waivers</li>
            <li>✅ Up to 5 team members</li>
            <li>✅ Custom branding</li>
            <li>✅ Priority support</li>
          </ul>
          {currentPlan === "pro" ? (
            <Badge variant='outline' className='mt-2'>
              Current Plan
            </Badge>
          ) : (
            <Button
              disabled={!!loadingPlan}
              onClick={() => handleSubscribe("pro")}
            >
              {loadingPlan === "pro" ? "Redirecting..." : "Get Pro"}
            </Button>
          )}
        </CardContent>
      </Card>

      <button
        onClick={handleManageSubscription}
        disabled={isPending}
        className='px-4 py-2 rounded border bg-white hover:bg-gray-100'
      >
        {isPending ? "Loading..." : "Manage Subscription"}
      </button>
    </div>
  );
}
