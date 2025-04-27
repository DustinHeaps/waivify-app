"use client";

import { ClerkProvider } from "@clerk/nextjs";

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider
      publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY as string}
      signInUrl='/sign-in'
      signUpUrl='/sign-up'
      afterSignInUrl='/home'
      afterSignUpUrl='/home'
    >
      {children}
    </ClerkProvider>
  );
}
