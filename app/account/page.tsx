"use client";

import { Card, CardContent } from "@/components/ui/card";
import { format } from "date-fns";
import CompanyInfo from "./components/CompanyInfo";
import { redirect, useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useRef, useState } from "react";
import { getUserById, updateUser } from "../actions/user";
import { useUser } from "@clerk/nextjs";
import { YourBrand } from "./components/YourBrand";
import { getDefaultTemplates } from "../actions/template";

export default function AccountPage() {
  return (
    <Suspense fallback={null}>
      <AccountPageContent />
    </Suspense>
  );
}

function AccountPageContent() {
  const [dbUser, setDBUser] = useState<any>(null);
  const [currentPlan, setCurrentPlan] = useState<string>("");
  const [templates, setTemplates] = useState<any[]>([]);
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
        const result = await getUserById();
        setDBUser(result);
        setCurrentPlan(result?.plan as string);
      }
    };

    fetchUser();
  }, [user?.id]);

  useEffect(() => {
    const fetchTemplates = async () => {
      const res = await getDefaultTemplates(); 
      setTemplates(res);
    };
  
    fetchTemplates();
  }, []);

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
        <h2 className='text-lg font-semibold'>Brand Settings</h2>

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

      <CompanyInfo />

        <YourBrand
          logoUrl={dbUser?.logoUrl}
          companyName={dbUser?.companyName}
          slug={dbUser?.slug}
          templates={templates}
          plan={(dbUser?.plan || "free") as "free" | "starter" | "pro"}
          selectedTemplateId={dbUser?.publicTemplateId} 
          onSelectTemplate={async (newId) => {
 

            await updateUser(dbUser.clerkId, {
              publicTemplateId: newId,
            });

            router.refresh();
          }}
        />
    </div>
  );
}
