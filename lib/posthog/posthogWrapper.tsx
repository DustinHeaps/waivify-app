"use client";

import { ReactNode } from "react";
import PostHogProvider from "@/lib/posthog/posthogProvider";

export default function PostHogWrapper({ children }: { children: ReactNode }) {
  return <PostHogProvider>{children}</PostHogProvider>;
}
