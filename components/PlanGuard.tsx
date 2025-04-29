"use client";

import { getUserById } from "@/app/actions/user";
import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function PlanGuard({
  children,
  allowedPlans = ["starter", "pro"],
}: {
  children: React.ReactNode;
  allowedPlans?: ("free" | "starter" | "pro")[];
}) {
  const { user } = useUser();
  const [plan, setPlan] = useState<"free" | "starter" | "pro">("free");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.id) return;

    (async () => {
      const dbUser = await getUserById();
      setPlan((dbUser?.plan as "free" | "starter" | "pro") || "free");
      setLoading(false);
    })();
  }, [user?.id]);

  if (loading) return null;

  if (!allowedPlans.includes(plan)) {
    return (
      <div className='flex justify-center items-center min-h-[50vh]'>
        <div className='bg-yellow-50 border border-yellow-200 text-yellow-800 text-sm rounded px-6 py-4 text-center max-w-md w-full'>
          <p className='mb-2 font-medium'>
            Upgrade to customize waiver templates.
          </p>
          <Link
            href='/billing'
            className='inline-block mt-2 bg-black text-white px-4 py-2 rounded hover:bg-gray-800 text-sm'
          >
            Upgrade Your Plan
          </Link>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
