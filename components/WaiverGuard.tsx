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
      const dbUser = await getUserById();
      setWaiversUsed(dbUser?.waiverCount || 0);
      setPlan((dbUser?.plan as "free" | "starter" | "pro") || "free");
      setLoading(false);
    })();
  }, [user?.id]);

  if (loading) return null;

  const limit = getWaiverLimit(plan as string);

  if (waiversUsed >= limit) {
    return (
      <div className='flex justify-center items-center min-h-[50vh]'>
        <div className='bg-red-50 border border-red-200 text-red-600 text-sm rounded px-6 py-4 text-center max-w-md w-full'>
          This waiver form is currently unavailable. Please contact the
          business.
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
