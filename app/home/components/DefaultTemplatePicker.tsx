"use client";

import { updateUser } from "@/app/actions/user";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Template, User } from "@prisma/client";
import Link from "next/link";

import { useState } from "react";

export function DefaultTemplatePicker({ user }: { user: User }) {
  user.plan = "pro";
  return (
    <>
      {user.plan === "free" ? (
        <div className='rounded-xl border p-6 shadow-sm bg-white'>
          <h2 className='text-lg font-semibold text-gray-900 mb-2'>
            Your Waiver Template is Pre-Set
          </h2>
          <p className='text-sm text-gray-600 mb-4'>
            Upgrade to Starter or Pro to customize your default template, create
            new ones, and tailor forms for each client type.
          </p>
          <Link
            href={"/waiver"}
            className='bg-black text-white text-sm font-medium px-4 py-2 rounded hover:bg-gray-800'
          >
            Choose Template
          </Link>
          <Link href='/billing' className='underline'>
            Upgrade to Pro
          </Link>
        </div>
      ) : (
        // <div className='rounded-xl border p-6 shadow-sm bg-white'>
        //   <h2 className='text-lg font-semibold text-gray-900 mb-2'>
        //     You’re in Control ✨
        //   </h2>
        //   <p className='text-sm text-gray-600 mb-4'>
        //     Customize your default template, create multiple waiver types, and
        //     tailor forms to every client scenario.
        //   </p>
        //   <ul className='text-sm text-gray-700 space-y-2'>
        //     <li>🧩 Build advanced templates with flexible fields</li>
        //     <li>🎨 Match your brand with logo and colors</li>
        //     <li>📊 Track usage and optimize your workflow</li>
        //   </ul>
        //   <Link
        //     href={"/waiver"}
        //     className='mt-4 inline-block bg-black text-white text-sm font-medium px-4 py-2 rounded hover:bg-gray-800'
        //   >
        //     Manage Templates
        //   </Link>
        // </div>
        <div className='rounded-xl border p-6 shadow-sm bg-white'>
          <h2 className='text-lg font-semibold text-gray-900 mb-2'>
            You’re Off to a Strong Start 💪
          </h2>
          <p className='text-sm text-gray-600 mb-4'>
            You've unlocked the ability to customize your default waiver
            template and start collecting submissions faster.
          </p>
          <ul className='text-sm text-gray-700 space-y-2'>
            <li>📝 Customize 1 active template</li>
            <li>📥 Download PDFs of signed waivers</li>
            <li>👤 Manage 1 team member</li>
          </ul>
          <div className='flex items-center gap-4 mt-4'>
            <Link
              href='/waiver'
              className='bg-black text-white text-sm font-medium px-4 py-2 rounded hover:bg-gray-800'
            >
              Edit Template
            </Link>
            <Link
              href='/billing'
              className='text-sm underline text-gray-600 hover:text-gray-800'
            >
              Upgrade to Pro
            </Link>
          </div>
        </div>
      )}
      {/* <div className="rounded-xl border p-6 shadow-sm bg-white">
  <h2 className="text-sm font-medium text-gray-900 mb-3">💡 Boost Your Waiver Flow</h2>
  <ul className="text-sm text-gray-700 space-y-2 list-disc list-inside">
    <li>📸 Add your logo to make it feel official</li>
    <li>📲 Share your link before appointments</li>
    <li>🧾 Export waivers weekly for record keeping</li>
  </ul>
</div> */}
      {/* <div className='rounded-xl border bg-white p-6 shadow-sm space-y-4'> */}
      {/* <div>
        <h2 className='text-lg font-semibold'>Default Waiver Template</h2>
        <p className='text-sm text-muted-foreground mb-4'>
          Your default template is pre-set. Upgrade to customize.
        </p>
      </div> */}

      {/* <Card>
        <h2 className='text-lg font-semibold'>Choose Your Default Template</h2>
        <p className='text-sm text-muted-foreground'>
          You can select one custom template to display at your public waiver
          link.
        </p>

       

        <p className='text-xs text-muted-foreground mt-2'>
          Want more templates?{" "}
          <Link href='/billing' className='underline'>
            Upgrade to Pro
          </Link>
        </p>
      </Card> */}
      {/* <Card>
  <h2 className="text-lg font-semibold">Manage Your Public Template</h2>
  <p className="text-sm text-muted-foreground">
    Choose from any of your custom templates. This will be shown on your public waiver link.
  </p>

  <Button className="mt-4">Choose Template</Button>

  <p className="text-xs text-muted-foreground mt-2">
    Tip: Keep your most-used template selected so clients always see the right form.
  </p>
</Card> */}
      {/* <Link
        href={"/waiver"}
        className='bg-black text-white text-sm font-medium px-4 py-2 rounded hover:bg-gray-800'
      >
        Choose Template
      </Link> */}
    </>
  );
}
