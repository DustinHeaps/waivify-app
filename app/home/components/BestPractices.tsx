import Link from 'next/link';
import React from "react";

export const BestPractices = () => {
  return (
    // <div className="rounded-xl border p-6 shadow-sm bg-yellow-50">

    //   <h2 className='text-sm font-medium text-gray-900 mb-3'>
    //     💡 Boost Your Waiver Flow
    //   </h2>
    //   <ul className='text-sm text-gray-700 space-y-2 list-disc list-inside'>
    //     <li>📸 Add your logo to make it feel official</li>
    //     <li>📲 Share your link before appointments</li>
    //     <li>🧾 Export waivers weekly for record keeping</li>
    //   </ul>
    // </div>
    <div className='rounded-xl border p-6 shadow-sm bg-white'>
      <h2 className='text-lg font-semibold text-gray-900 mb-2'>
        Go Pro & Unlock More 💎
      </h2>
      <p className='text-sm text-gray-600 mb-4'>
        Upgrade to Pro for more flexibility and features designed to scale with
        your business.
      </p>
      <ul className='text-sm text-gray-700 space-y-2'>
        <li>🧾 Use up to 5 custom templates</li>
        <li>👥 Invite up to 5 team members</li>
        <li>🎨 Add branding & priority support</li>
      </ul>
      <Link
        href='/billing'
        className='mt-4 inline-block text-sm underline text-gray-600 hover:text-gray-800'
      >
        See Pro Features
      </Link>
    </div>
  );
};
