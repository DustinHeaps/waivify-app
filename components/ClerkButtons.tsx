"use client";

import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";

export default function ClerkButtons() {
  return (
    <div className='absolute top-6 right-6 z-50'>
      <SignedOut>
        <SignInButton mode='modal'>
          <button className='bg-teal-500 px-4 py-2 rounded text-white hover:bg-teal-400'>
            Get Started
          </button>
        </SignInButton>
      </SignedOut>
      <SignedIn>
        <UserButton />
      </SignedIn>
    </div>
  );
}