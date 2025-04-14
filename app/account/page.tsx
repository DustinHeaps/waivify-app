"use client";

import { Card, CardContent } from "@/components/ui/card";
import { format } from "date-fns";
import CompanyInfo from "./components/CompanyInfo";
import { Suspense, useEffect, useRef, useState } from "react";
import { getUserById, updateUser } from "../actions/user";
import { useUser } from "@clerk/nextjs";
import { YourBrand } from "./components/YourBrand";
import { getDefaultTemplates } from "../actions/template";

export default function AccountPage() {
  
  const [dbUser, setDBUser] = useState<any>(null);
  const [currentPlan, setCurrentPlan] = useState<string>("");
  const [templates, setTemplates] = useState<any[]>([]);
  const { user } = useUser();

  const createdAt = user?.createdAt
    ? format(new Date(user.createdAt), "MMMM d, yyyy")
    : "N/A";

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
    <div className='max-w-screen-md mx-auto px-4 sm:px-6 py-6 space-y-6'>

      {/* Header */}
      <div className='space-y-1'>
        <h2 className='text-lg font-semibold'>Brand Settings</h2>

        <p className='text-muted-foreground text-sm'>
          Manage your account settings and preferences.
        </p>
      </div>

      {/* Profile */}
      <Card>
        <CardContent className='p-4 sm:p-5 space-y-3'>
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
        plan={(dbUser?.plan || "free") as "free" | "starter" | "pro"}
      />
    </div>
  );
}
