"use client";

import { useState, useTransition } from "react";
import { checkout, createCustomerPortalSession } from "@/app/actions/stripe";
import { posthog } from "posthog-js";
import { Button } from "@/components/ui/button"; // or use your custom button component
import { User } from "@prisma/client";

type UpgradeButtonProps = {
  plan: "free" | "starter" | "pro";
  user: User;
  setError: React.Dispatch<React.SetStateAction<string | null>>;
};

export default function UpgradeButton({
  plan,
  user,
  setError,
}: UpgradeButtonProps) {
  const [isPending, startTransition] = useTransition();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubscribe = async () => {
    if (plan === "free") {
      handleManageSubscription();
    } else {
      startTransition(async () => {
        posthog.capture("clicked_upgrade_button", {
          plan,
        });
        setError(null);
        setIsLoading(true);
        try {
          await checkout({ userId: user?.clerkId, plan } as any);
        } catch (err: any) {
          setError(err.message || "Something went wrong.");
        } finally {
          setIsLoading(false);
        }
      });
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

  return (
    <Button
      className={
        plan === "pro"
          ? "mt-6 h-12 text-base font-semibold bg-blue-600 hover:bg-blue-700 text-white rounded px-6 py-3 transition"
          : undefined
      }
      onClick={() => handleSubscribe()}
      disabled={isPending}
    >
      {isPending
        ? "Redirecting…"
        : plan === "starter"
          ? user.plan === "pro"
            ? "Switch to Starter"
            : user.plan === "free"
              ? "Get Starter"
              : "Switch to Starter"
          : plan === "pro"
            ? user.plan === "starter"
              ? "Upgrade to Pro"
              : user.plan === "free"
                ? "Get Pro"
                : "Switch to Pro"
            : plan === "free"
              ? "Switch to Free"
              : "Get Started"}
    </Button>
  );
}
