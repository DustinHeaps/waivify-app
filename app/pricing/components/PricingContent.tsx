"use client";

import React, { useState } from "react";
import UpgradeButton from "./UpgradeButton";
import { User } from "@prisma/client";
import { Button } from "@/components/ui/button";

type Props = {
  user: User;
};

export const PricingContent = ({ user }: Props) => {
  const [error, setError] = useState<string | null>(null);

  const currentPlan = user?.plan;

  return (
    <div className='max-w-5xl mx-auto px-4 py-16'>
      <div className='text-center mb-12'>
        <h1 className='text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white'>
          Simple, transparent pricing
        </h1>
        <p className='mt-2 text-lg text-gray-600 dark:text-gray-300'>
          Choose a plan that fits your business — no hidden fees.
        </p>
      </div>

      <div className='grid gap-8 sm:grid-cols-2 lg:grid-cols-3'>
        {/* Starter Plan */}
        <div className='rounded-lg border border-border bg-white dark:bg-muted p-6 flex flex-col shadow-md'>
          <h2 className='text-xl font-semibold text-gray-900 dark:text-white'>
            Starter
          </h2>
          <p className='text-sm text-gray-500 dark:text-gray-300 mb-4'>
            $12/month
          </p>
          <ul className='flex-1 text-sm space-y-2 text-gray-700 dark:text-gray-300'>
            <li>Everything in Free, plus:</li>
            <li>✅ 50 waivers/month</li>
            <li>✅ Download signed PDFs</li>
            <li>
              ✅ Access waiver table (search, filter, archive, delete, export)
            </li>
          </ul>

          {currentPlan === "starter" ? (
            <Button disabled className='mt-6 w-full cursor-default'>
              Current Plan
            </Button>
          ) : (
            <UpgradeButton setError={setError} user={user!} plan='starter' />
          )}

          {error && (
            <div className='text-sm text-red-500 border border-red-300 bg-red-50 rounded p-3'>
              {error}
            </div>
          )}
        </div>
        {/* Pro Plan */}
        <div className='relative rounded-lg border-2 border-blue-500 bg-blue-50 dark:bg-muted p-6 flex flex-col'>
          <span className='absolute top-0 left-1/2 -translate-x-1/2 text-xs font-semibold bg-blue-700 text-white px-3 py-1 rounded-b-md shadow-md'>
            Most Popular
          </span>
          <h2 className='text-xl font-semibold text-gray-900 dark:text-white'>
            Pro
          </h2>
          <p className='text-sm text-gray-500 dark:text-gray-300 mb-4'>
            $29/month
          </p>
          <ul className='flex-1 text-sm space-y-2 text-gray-700 dark:text-gray-300'>
            <li>Everything in Starter, plus:</li>
            <li>✅ Unlimited waivers</li>
            <li>✅ Remove watermark</li>
            <li>✅ Priority support</li>
            <li>✅ Access to Advanced Analytics</li>
          </ul>
          {currentPlan === "pro" ? (
            <Button disabled className='mt-6 w-full cursor-default'>
              Current Plan
            </Button>
          ) : (
            <UpgradeButton setError={setError} user={user!} plan='pro' />
          )}
        </div>
        {/* Free Plan */}
        <div className='rounded-lg border border-border bg-white dark:bg-muted p-6 flex flex-col'>
          <h2 className='text-xl font-semibold text-gray-900 dark:text-white'>
            Free
          </h2>
          <p className='text-sm text-gray-500 dark:text-gray-300 mb-4'>
            $0/month
          </p>
          <ul className='flex-1 text-sm space-y-2 text-gray-700 dark:text-gray-300'>
            <li>✅ 10 total waivers</li>
            <li>✅ Use default templates</li>
            <li>✅ Add logo, company name & QR code</li>
            <li>✅ Email confirmations</li>
          </ul>
          {currentPlan === "free"  ? (
            <Button disabled className='mt-6 w-full cursor-default'>
              Current Plan
            </Button>
          ) : (
            <UpgradeButton setError={setError} user={user!} plan='free' />
          )}
        </div>
      </div>
    </div>
  );
};
