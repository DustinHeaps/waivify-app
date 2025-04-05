"use client";

import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import { getUserById } from "@/app/actions/user";
import { getWaiverLimit } from "@/lib/waiverUsage";

export function PlanSummary() {
  const { user } = useUser();
  const [waiversUsed, setWaiversUsed] = useState<number>(0);
  const [plan, setPlan] = useState<"free" | "starter" | "pro">("free");
  const [renewDate, setRenewDate] = useState<string | null>(null);

  let daysLeft: number | null = null;
  if (renewDate) {
    const now = new Date();
    const renew = new Date(renewDate);
    const diff = Math.ceil(
      (renew.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)
    );
    daysLeft = diff > 0 ? diff : 0;
  }

  daysLeft = 20

  useEffect(() => {
    if (!user?.id) return;

    (async () => {
      const dbUser = await getUserById(user.id);
      setWaiversUsed(dbUser?.waiverCount || 0);
      setPlan((dbUser?.plan as "free" | "starter" | "pro") || "free");
      setRenewDate(dbUser?.renewalDate?.toISOString() || null); 
    })();
  }, [user?.id]);

  const limit = getWaiverLimit(plan);
  const formattedRenewDate = renewDate
    ? new Date(renewDate).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      })
    : "N/A";

  return (
    <div className='border rounded-xl p-6 w-full bg-white shadow-sm'>
      <h3 className='text-md font-semibold mb-4'>Plan Summary</h3>

      <div className='space-y-2 text-sm'>
        <p>
          🧾 Waivers this month:{" "}
          <span className='font-medium'>
            {plan === "pro" ? "Unlimited" : `${waiversUsed} / ${limit}`}
          </span>
        </p>
        <p>
          📦 Current Plan:{" "}
          <span className='font-medium capitalize'>{plan}</span>
        </p>
        <p>
          ⏳ Renew Date:{" "}
          <span className='font-medium'>{formattedRenewDate}</span>
          {daysLeft !== null && (
            <span className='ml-2 text-xs text-muted-foreground'>
              ({daysLeft} {daysLeft === 1 ? "day" : "days"} left)
            </span>
          )}
        </p>
      </div>

      <button className='mt-4 w-full bg-black text-white py-2 rounded-md text-sm font-medium hover:bg-gray-800 transition'>
        {plan === "pro" ? "Manage Plan" : "Upgrade Plan"}
      </button>
    </div>
  );
}
