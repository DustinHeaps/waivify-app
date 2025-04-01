"use client";

import { useRouter } from "next/navigation";

export function ReturnHomeButton() {
  const router = useRouter();

  return (
    <button
      onClick={() => router.push("/")}
      className='bg-teal-500 hover:bg-teal-600 text-white px-6 py-2 rounded transition'
    >
      Return Home
    </button>
  );
}
