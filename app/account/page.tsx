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
import { Button } from "@/components/ui/button";
import { YourBrand } from "./components/YourBrand";

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
        plan={(dbUser?.plan || "free") as "free" | "starter" | "pro"}
      />
    </div>
  );
}
// import Image from "next/image";
// import Link from "next/link";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Card, CardContent } from "@/components/ui/card";

// export default function BrandSettings({
//   logoUrl,
//   companyName,
//   slug,
//   plan,
// }: {
//   logoUrl?: string;
//   companyName?: string;
//   slug?: string;
//   plan: "free" | "starter" | "pro";
// }) {
//   const publicUrl = `https://waivify.com/${slug || "undefined"}`;
//   const hasBrand = !!logoUrl && !!companyName;

//   return (
//     // <Card>
//     //   <CardContent className="p-6 space-y-4">
//     <div className='max-w-screen-md mx-auto py-10 space-y-6'>
//         <h2 className="text-lg font-semibold">Brand Settings</h2>

//         {/* Editable Info */}
        // <div className="space-y-2">
        //   <Label htmlFor="companyName">Company Name</Label>
        //   <Input
        //     id="companyName"
        //     defaultValue={companyName}
        //     placeholder="Enter your company name"
        //   />

        //   <Label htmlFor="logo">Logo Upload</Label>
        //   <Input id="logo" type="file" />
        //   <Button variant="default">Save Info</Button>
        // </div>

//         <hr className="my-4" />

        {/* Preview Section */}
       

          {/* <div className="flex flex-col items-center gap-2">
            {hasBrand ? (
              <Image
                src={`https://api.qrserver.com/v1/create-qr-code/?data=${publicUrl}&size=160x160`}
                alt="QR Code"
                width={120}
                height={120}
              />
            ) : (
              <div className="w-[120px] h-[120px] bg-gray-100 rounded flex items-center justify-center text-xs text-muted-foreground text-center px-2">
                QR preview
              </div>
            )}
            <p className="text-xs text-muted-foreground">Scan to view waiver</p>
          </div>
        </div> 


//         <div className="flex flex-wrap gap-2">
//           <Link
//             href={publicUrl}
//             target="_blank"
//             className="text-sm px-3 py-1.5 bg-black text-white rounded hover:bg-gray-800"
//           >
//             View Public Waiver
//           </Link>

//           <Link
//             href="/account"
//             className="text-sm px-3 py-1.5 bg-gray-100 rounded hover:bg-gray-200"
//           >
//             Customize Branding
//           </Link>
//         </div>

//         {/* Waivify attribution */}
//         <p className="text-xs text-muted-foreground mt-2">
//           “Powered by Waivify” will be visible to clients.{" "}
//           {plan !== "pro" && (
//             <Link href="/upgrade" className="text-blue-600 underline">
//               Upgrade to remove
//             </Link>
//           )}
//         </p>
//         </div>
//     //   </CardContent>
//     // </Card>
//   );
// }
