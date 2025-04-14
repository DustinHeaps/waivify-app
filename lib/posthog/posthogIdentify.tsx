"use client";

import { useEffect } from "react";
import posthog from "posthog-js";
// Assuming you're using Clerk or some other client auth
import { useUser } from "@clerk/nextjs"; // Or your auth hook

export function PostHogIdentify() {
  const { user } = useUser();

  useEffect(() => {
    if (user && typeof window !== "undefined") {
      posthog.identify(user.id, {
        email: user.emailAddresses?.[0]?.emailAddress,
        name: `${user.firstName} ${user.lastName}`,
      });
    }
  }, [user]);

  return null;
}
