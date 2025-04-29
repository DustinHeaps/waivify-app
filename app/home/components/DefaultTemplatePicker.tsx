"use client";

import { User } from "@prisma/client";
import Link from "next/link";

export function DefaultTemplatePicker({ user }: { user: User }) {
  const plan = user.plan;

  return (
    <section className='space-y-10'>
      <div>
        {/* Free Tier */}
        {plan === "free" && (
          <div className='rounded-xl border bg-muted/50 p-6 shadow-sm'>
            <h3 className='font-semibold text-sm text-gray-900 mb-2 flex items-center gap-1'>
              Limited Customization Active 🔒
            </h3>
            <p className='text-sm text-gray-700 mb-4'>
              You're currently using the default waiver template. Upgrade to
              unlock full template editing, advanced form fields, and tailored
              flows for each client type.
            </p>
            <ul className='text-sm text-gray-700 space-y-2'>
              <li>🧾 Use pre-set waiver structure</li>
              <li>🎯 Ideal for quick setup & testing</li>
              <li>⚙️ Upgrade to customize and scale</li>
            </ul>
            <div className='mt-4 flex gap-3'>
              <Link
                href='/waiver'
                className='bg-black text-white text-sm font-medium px-4 py-2 rounded hover:bg-gray-700'
              >
                Choose Template
              </Link>
              <Link
                href='/billing'
                className='inline-block bg-white border text-sm font-medium px-4 py-2 rounded hover:bg-gray-100'
              >
                Upgrade to Customize
              </Link>
            </div>
          </div>
        )}

        {/* Starter Tier */}
        {plan === "starter" && (
          <div className='rounded-xl border bg-muted/50 p-6 shadow-sm'>
            <h3 className='font-semibold text-sm text-gray-900 mb-2 flex items-center gap-1'>
              You’re off to a strong start 💪
            </h3>
            <p className='text-sm text-gray-700 mb-4'>
              You can now customize your default waiver template and start
              collecting submissions faster.
            </p>
            <ul className='text-sm text-gray-700 space-y-2'>
              <li>📝 Edit your default waiver template</li>
              <li>📂 Save time with a reusable structure</li>
              <li>📬 Deliver a personalized signing flow</li>
            </ul>
            <div className='mt-4 flex gap-3'>
              <Link
                href='/waiver'
                className='bg-black text-white text-sm font-medium px-4 py-2 rounded hover:bg-gray-700'
              >
                Choose Template
              </Link>
              <Link
                href='/template'
                className='bg-white border text-sm font-medium px-4 py-2 rounded hover:bg-gray-100'
              >
                Edit Template
              </Link>
              <Link
                href='/billing'
                className='bg-white border text-sm font-medium px-4 py-2 rounded hover:bg-gray-100'
              >
                Upgrade to Pro
              </Link>
            </div>
          </div>
        )}

        {/* Pro Tier */}
        {plan === "pro" && (
          <div className='rounded-xl border p-6 shadow-sm bg-muted/50'>
            <h3 className='text-lg font-semibold text-gray-900 mb-2'>
              You can now fully customize your waiver templates ✨
            </h3>
            <p className='text-sm text-gray-600 mb-4'>
              Create multiple waiver types, apply branding, and fine-tune the
              signing experience for each client.
            </p>
            <ul className='text-sm text-gray-700 space-y-2'>
              <li>🧩 Build advanced templates with flexible fields</li>
              <li>🎨 Match your brand with logo and colors</li>
              <li>📊 Track usage and optimize your workflow</li>
            </ul>
            <div className='mt-4 flex flex-wrap gap-3'>
              <Link
                href='/waiver'
                className='bg-black text-white text-sm font-medium px-4 py-2 rounded hover:bg-gray-700'
              >
                Choose Template
              </Link>
              <Link
                href='/template'
                className='bg-white border text-sm font-medium px-4 py-2 rounded hover:bg-gray-100'
              >
                Manage Templates
              </Link>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
