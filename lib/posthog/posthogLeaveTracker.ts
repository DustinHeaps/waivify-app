"use client";

import { useEffect } from "react";
import posthog from "posthog-js";

export default function PostHogLeaveTracker() {
  useEffect(() => {
    const handleBeforeUnload = () => {
      posthog.capture('$pageleave');
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);

  return null;
}
