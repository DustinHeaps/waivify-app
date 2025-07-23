"use client";

import { ReactNode } from "react";
import PostHogProvider from "@/lib/posthog/posthogProvider";
import PostHogLeaveTracker from "./posthogLeaveTracker";

export default function PostHogWrapper({ children }: { children: ReactNode }) {
  return (
    <PostHogProvider>
      <PostHogLeaveTracker />
      {children}
    </PostHogProvider>
  );
}
