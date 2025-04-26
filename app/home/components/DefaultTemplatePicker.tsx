"use client";

import { User } from "@prisma/client";
import Link from "next/link";

export function DefaultTemplatePicker({ user }: { user: User }) {

  return (
    <>
      {user.plan === "free" ? (
        <div className='rounded-xl border p-6 shadow-sm bg-white'>
          <h2 className='text-lg font-semibold text-gray-900 mb-2'>
            Your Waiver Template is Pre-Set
          </h2>
          
          <p className='text-sm text-gray-600 mb-28'>
            Upgrade to Starter or Pro to customize your default template, create
            new ones, and tailor forms for each client type.
          </p>
          <Link
            href={"/waiver"}
            className='bg-black text-white text-sm font-medium px-4 py-2 rounded hover:bg-gray-700'
          >
            Choose Template
          </Link>
          <Link href='/billing' className='underline pl-5'>
            Upgrade 
          </Link>
        </div>
      ) : user.plan === "starter" ? (
        <div className='rounded-xl border p-6 shadow-sm bg-white'>
          <h2 className='text-lg font-semibold text-gray-900 mb-2'>
            You’re Off to a Strong Start 💪
          </h2>
          <p className='text-sm text-gray-600 mb-[105px]'>
            You've unlocked the ability to customize your default waiver
            template and start collecting submissions faster.
          </p>
         
          <div className='flex items-center gap-4 mt-4'>
            <Link
              href='/waiver/edit'
              className='bg-black text-white text-sm font-medium px-4 py-2 rounded hover:bg-gray-700'
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
      ) : (
        <div className='rounded-xl border p-6 shadow-sm bg-white'>
          <h2 className='text-lg font-semibold text-gray-900 mb-2'>
            You’re in Control ✨
          </h2>
          <p className='text-sm text-gray-600 mb-4'>
            Customize your default template, create multiple waiver types, and
            tailor forms to every client scenario.
          </p>
          <ul className='text-sm text-gray-700 space-y-2'>
            <li>🧩 Build advanced templates with flexible fields</li>
            <li>🎨 Match your brand with logo and colors</li>
            <li>📊 Track usage and optimize your workflow</li>
          </ul>
          <Link
            href={"/waiver/edit"}
            className='mt-4 inline-block bg-black text-white text-sm font-medium px-4 py-2 rounded hover:bg-gray-700'
          >
            Manage Templates
          </Link>
        </div>
      )}
    </>
  );
}
