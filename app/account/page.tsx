"use client";

import { Card, CardContent } from "@/components/ui/card";
import { format } from "date-fns";
import { Progress } from "@radix-ui/react-progress";
import { Badge } from "@/components/ui/badge";
import CompanyInfo from "./components/CompanyInfo";
import { redirect, useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import { checkout } from "../actions/stripe";
import { getUserById } from "../actions/user";
import { useUser } from "@clerk/nextjs";

export default function AccountPage() {
  return (
    <Suspense fallback={null}>
      <AccountPageContent />
    </Suspense>
  );
}

function AccountPageContent() {
  const [dbUser, setDBUser] = useState<any>(null);
  const [currentPlan, setCurrentPlan] = useState<string>('');

  const { user } = useUser();
  const router = useRouter();
  const searchParams = useSearchParams();
  const success = searchParams.get("success");
  const canceled = searchParams.get("canceled");

  const createdAt = user?.createdAt
    ? format(new Date(user.createdAt), "MMMM d, yyyy")
    : "N/A";

  const completedSteps = 5;
  const totalSteps = 12;

  useEffect(() => {
    if (success || canceled) {
      const timeout = setTimeout(() => {
        router.replace("/account");
      }, 3000); // clears after 3 seconds
      return () => clearTimeout(timeout);
    }
  }, [success, canceled, router]);

  const clerkId = user?.id;
  useEffect(() => {
    const fetchUser = async () => {
      if (user?.id) {
        const result = await getUserById(clerkId as string);
        setDBUser(result);
        setCurrentPlan(result?.plan as string)
      }
    };

    fetchUser();
  }, [user?.id]);

 

  return (
    <div className='max-w-screen-md mx-auto py-10 space-y-6'>
      {/* ✅ Feedback Banner */}
      {success && (
        <div className='rounded-lg border border-green-500 bg-green-50 p-4 text-center'>
          <h2 className='text-lg font-semibold text-green-600'>
            ✅ Payment Successful!
          </h2>
          <p className='text-sm text-green-700 mt-1'>
            Your account has been upgraded.
          </p>
        </div>
      )}

      {canceled && (
        <div className='rounded-lg border border-red-500 bg-red-50 p-4 text-center'>
          <h2 className='text-lg font-semibold text-red-600'>
            ❌ Checkout Canceled
          </h2>
          <p className='text-sm text-red-700 mt-1'>
            You can try again anytime.
          </p>
        </div>
      )}

      {/* Header */}
      <div className='space-y-1'>
        <h1 className='text-xl font-semibold'>Your Account</h1>
        <p className='text-muted-foreground text-sm'>
          Manage your account settings and preferences.
        </p>
      </div>

      {/* Profile */}
      <Card>
        <CardContent className='p-5 space-y-3'>
          <div className='flex items-center space-x-4'>
            <div className='h-10 w-10 rounded-full bg-muted flex items-center justify-center text-sm font-medium uppercase'>
              {user?.firstName?.[0]}
            </div>
            <div>
              <p className='font-medium'>{user?.fullName || "Unnamed User"}</p>
              <p className='text-sm text-muted-foreground'>
                {user?.primaryEmailAddress?.emailAddress}
              </p>
              <p className='text-xs text-muted-foreground'>
                Joined {createdAt}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Progress */}
      <Card>
        <CardContent className='p-5 space-y-3'>
          <div className='flex items-center justify-between'>
            <h2 className='text-sm font-medium'>Next Steps Progress</h2>
            <Badge variant='secondary'>
              {completedSteps}/{totalSteps} completed
            </Badge>
          </div>
          <Progress value={(completedSteps / totalSteps) * 100} />
        </CardContent>
      </Card>

      <CompanyInfo />

      {/* Billing & Plan */}
      <Card>
        <CardContent className='p-5 space-y-3'>
          <h2 className='text-sm font-medium'>Billing & Plan</h2>
          <p className='text-sm text-muted-foreground'>
            Upgrade, downgrade, or manage your subscription anytime.
          </p>

          {/* Plan Buttons */}
          <div className='space-y-2'>
            {[
              { label: "Starter", id: "starter", price: "$9/mo" },
              { label: "Pro", id: "pro", price: "$29/mo" },
            ].map((plan) => {
              const isCurrent = dbUser?.plan === plan.id;
              const [loading, setLoading] = useState(false);

              return (
                <button
                  key={plan.id}
                  disabled={isCurrent || loading}
                  onClick={async () => {
                    setLoading(true);
                    await checkout({ userId: user?.id, plan: plan.id } as any);
                    setLoading(false);
                  }}
                  className={`w-full px-4 py-2 rounded border transition text-left flex items-center justify-between ${
                    isCurrent
                      ? "bg-green-50 border-green-200 text-green-800 cursor-not-allowed"
                      : "bg-white border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <span className='font-medium'>
                    {plan.label} - {plan.price}
                  </span>
                  {isCurrent ? (
                    <span className='text-sm text-green-600'>Current Plan</span>
                  ) : loading ? (
                    <span className='text-sm text-gray-400'>Processing...</span>
                  ) : currentPlan === "pro" && plan.id === "starter" ? (
                    <span className='text-sm text-blue-600'>
                      Switch to Starter
                    </span>
                  ) : (
                    <span className='text-sm text-blue-600'>Upgrade</span>
                  )}
                </button>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
