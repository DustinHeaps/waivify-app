"use client";

import { Button } from "@/components/ui/button";

export function JoinWaitlistButton() {
  if (process.env.NODE_ENV === "production") return null;

  return (
    <Button
      data-tally-open={process.env.NEXT_PUBLIC_TALLY_ID}
      data-tally-layout='modal'
      data-tally-width='500'
      data-tally-overlay='1'
      data-tally-emoji-text='👋'
      data-tally-emoji-animation='wave'
      size='lg'
      className='bg-teal-500 transform transition duration-200 ease-in-out hover:bg-teal-400 hover:scale-105 hover:shadow-xl'
    >
      Join the Waitlist
    </Button>
  );
}
