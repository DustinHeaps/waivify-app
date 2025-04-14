"use client";

import { useEffect } from "react";


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
          loaded: (ph) => {
            // Optional: Load Web Vitals if you care about performance metrics
            // Remove this if you don't want it
            (ph as any).loadWebVitals?.();
          },
        });
        posthog.capture("page_loaded");
      });
    }
  }, []);

  return <>{children}</>;
}
