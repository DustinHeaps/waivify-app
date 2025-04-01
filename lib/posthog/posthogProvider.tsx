"use client";

import { useEffect } from "react";
import posthog from "@/lib/posthog/posthog.client";

export default function PostHogProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    if (typeof window !== "undefined") {
      import("posthog-js").then(({ default: posthog }) => {
        posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY!, {
          api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST,
          capture_pageview: false,
        });
        posthog.capture("page_loaded");
      });
    }
  }, []);

  return <>{children}</>;
}
