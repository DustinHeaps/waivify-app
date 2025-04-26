"use client";

import { Card, CardContent } from "@/components/ui/card";
import { format } from "date-fns";
import CompanyInfo from "./components/CompanyInfo";
import { Suspense, useEffect, useRef, useState } from "react";
import { getUserById, updateUser } from "../actions/user";
import { useUser } from "@clerk/nextjs";
import { YourBrand } from "./components/YourBrand";
import { getDefaultTemplates } from "../actions/template";
import { User } from "@prisma/client";
import { slugify } from "@/lib/utils";

export default function AccountPage() {
  const [companyName, setCompanyName] = useState("");
  const [logoUrl, setLogoUrl] = useState("");
  const [slug, setSlug] = useState("");
  const [dbUser, setDBUser] = useState<User | null>();
  const [currentPlan, setCurrentPlan] = useState<string>("");

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
        setCompanyName(result?.companyName as string);
        setLogoUrl(result?.logoUrl as string);
     
      }
    };

    fetchUser();
  }, [user?.id]);

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

      <CompanyInfo
        companyName={companyName}
        logoUrl={logoUrl}
        onChange={(name: string, logo: string, updatedSlug: string) => {
          setCompanyName(name);
          setLogoUrl(logo);
          setSlug(slugify(name));
        }}
      />

      <YourBrand
        logoUrl={logoUrl}
        companyName={companyName}
        slug={slug}
        plan={(dbUser?.plan || "free") as "free" | "starter" | "pro"}
      />
    </div>
  );
}
