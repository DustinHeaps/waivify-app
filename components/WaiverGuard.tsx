"use client";

import { getUserById } from "@/app/actions/user";
import { getWaiverLimit } from "@/lib/waiverUsage";
import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";

export default function WaiverLimitGuard({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user } = useUser();
  const [waiversUsed, setWaiversUsed] = useState<number>(0);
  const [plan, setPlan] = useState<"free" | "starter" | "pro">("free");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.id) return;

    (async () => {
      const dbUser = await getUserById(user.id);
      setWaiversUsed(dbUser?.waiverCount || 0);
      setPlan((dbUser?.plan as "free" | "starter" | "pro") || "free");
      setLoading(false);
    })();
  }, [user?.id]);


  if (loading) return null;

  const limit = getWaiverLimit(plan as string);

  if (waiversUsed >= limit) {
    return (
      <div className='p-4 border border-red-200 bg-red-50 rounded text-sm text-red-600 space-y-1'>
        <p>
          You've reached your monthly limit of {limit} waivers.
        </p>
        <a
          href='/account'
          className='inline-block text-blue-600 underline hover:text-blue-800 transition'
        >
          Upgrade your plan to unlock more →
        </a>
      </div>
    );
  }

  return <>{children}</>;
}
