"use client";

import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import { usePathname } from "next/navigation";

export default function ClerkButtons() {
  const pathname = usePathname();
  
  // ❌ Don't render anything on /blog routes
  if (pathname?.startsWith("/blog")) return null;

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
