"use client";

import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import { usePathname } from "next/navigation";

export default function ClerkButtons() {
  const pathname = usePathname();

  const isRoot = pathname === "/";
  const isBlog = pathname?.startsWith("/blog");

  if (pathname?.startsWith("/sign-up")) return null;

  if (pathname?.startsWith("/sign-in")) return null;
  if (pathname?.startsWith("/waiver/confirmation")) return null;

  if (isBlog) return null;
  return (
    <div className='absolute top-6 right-6 z-50'>
      <SignedOut>
        {!isRoot && (
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
