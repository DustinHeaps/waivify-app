"use client";

import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import { usePathname } from "next/navigation";
import { useClerk404 } from "./Clerk404Context";

export default function ClerkButtons() {
  const pathname = usePathname();

  const is404 = useClerk404();

  const isRoot = pathname === "/";
  const isBlog = pathname?.startsWith("/blog");
  if (

    pathname?.startsWith("/sign-up") ||
    pathname?.startsWith("/sign-in") ||
    pathname?.startsWith("/waiver/confirmation") ||
    pathname?.startsWith("/co-") ||
    pathname?.startsWith("/terms") ||
    pathname?.startsWith("/policy") ||
    pathname?.startsWith("/privacy") ||
    isBlog
  ) {
    return null;
  }
  if (isBlog) return null;
  return (
    <div className='absolute top-6 right-6 z-50'>
      <SignedOut>
        {!isRoot && is404 && (
          <SignInButton mode='modal'>
            <button className='btn-navy px-4 py-2 rounded'>Get Started</button>
          </SignInButton>
        )}
      </SignedOut>

      <SignedIn>
        <UserButton />
      </SignedIn>
    </div>
  );
}
