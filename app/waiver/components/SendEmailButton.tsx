"use client";

import { sendEmail } from "@/app/actions/waiver";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

export function SendEmailButton({
  id,
  waiverId,
}: {
  id: string;
  waiverId: string;
}) {
  const [isPending, setIsPending] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const [emailError, setEmailError] = useState(false);

  const handleClick = async () => {
    try {
      setIsPending(true);
      await sendEmail(id, waiverId);
      setEmailSent(true);
      setTimeout(() => setEmailSent(false), 3000);
    } catch (err) {
      setIsPending(false);
      setEmailError(true);
      setTimeout(() => setEmailError(false), 3000);
    } finally {
      setIsPending(false);
    }
  };

  return (
    <div>
      <button
        onClick={handleClick}
        className='text-blue-500 hover:underline ml-1'
        disabled={isPending}
      >
        {isPending ? "Emailing..." : "Email it to me"}
      </button>

      <AnimatePresence>
        {emailSent && (
          <motion.p
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.2 }}
            className='absolute top-14 right-[154px] text-green-600 text-sm'
          >
            ✅ Email sent!
          </motion.p>
        )}

        {emailError && (
          <motion.p
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.2 }}
            className='absolute top-14 right-16  text-red-600 text-sm'
          >
            ❌ Failed to send email. Please try again.
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}
