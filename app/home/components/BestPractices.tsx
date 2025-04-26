import { User } from "@prisma/client";
import Link from "next/link";
import React from "react";

export const BestPractices = ({ user }: { user: User }) => {
  return (
    <>
      {user.plan === "free" ? (
        <div className='rounded-xl border p-6 shadow-sm'>
          <h3 className='font-semibold text-gray-900 mb-3'>
            💡 Boost Your Waiver Flow
          </h3>
          <ul className='text-sm text-gray-700 space-y-2 list-disc list-inside'>
            <li>📸 Add your logo to make it feel official</li>
            <li>📲 Share your link before appointments</li>
            <li>🧾 Export waivers weekly for record keeping</li>
          </ul>
        </div>
      ) : user.plan === "starter" ? (
        <div className='rounded-xl border p-6 shadow-sm'>
          <h3 className='font-semibold text-gray-900 mb-3'>
            🎯 Get Set Up for Success
          </h3>
          <ul className='text-sm text-gray-800 space-y-2'>
            <li>🛠️ Tailor your waiver with flexible fields</li>
            <li>📄 Keep clean records with PDF downloads</li>
          </ul>
        </div>
      ) : (
        <div className='rounded-xl border p-6 shadow-sm bg-white'>
          <h3 className='font-semibold text-gray-900 mb-3'>
            Level Up Your Waiver Game 💎
          </h3>
          <p className='text-sm text-gray-600 mb-4'>
            You’ve unlocked the full toolkit for growing teams and busy
            workflows.
          </p>
          <ul className='text-sm text-gray-800 space-y-2'>
            <li>🧠 Save up to 5 reusable templates</li>
            <li>👥 PDF Branding</li>
            <li>⚡️ Get priority support when you need it</li>
          </ul>
          {/* <div className='mt-4'>
            <Link
              href='/account'
              className='bg-black text-white text-sm font-medium px-4 py-2 rounded hover:bg-gray-700'
            >
              Manage Team & Settings
            </Link>
          </div> */}
        </div>
      )}
    </>
  );
};
