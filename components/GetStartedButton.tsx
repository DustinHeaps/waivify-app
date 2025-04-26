"use client";

import { useClerk } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

export function GetStartedButton() {
  const { openSignUp } = useClerk();
  const router = useRouter();

  const handleClick = () => {
    openSignUp({
      afterSignInUrl: "/home",
      afterSignUpUrl: "/home",
    });
  };

  return (
    <button
      onClick={handleClick}
      className='bg-teal-500 text-white font-semibold px-4 py-2 rounded hover:bg-teal-600 transition'
    >
      Get Started
    </button>
  );
}
