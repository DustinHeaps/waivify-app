"use client";

import { submitFeedback } from "@/app/actions/email";
import { useState } from "react";

export function Feedback() {
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    "idle"
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");

    const res = await submitFeedback(message);
    if (res.success) {
      setStatus("sent");
      setMessage("");
    } else {
      setStatus("error");
    }
  };

  return (
    <div className='border rounded-lg p-4 bg-white shadow-sm'>
      <h2 className='text-sm font-medium mb-2'>Got Feedback?</h2>
      <form onSubmit={handleSubmit} className='space-y-2'>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className='w-full text-sm border rounded p-2 min-h-[80px] mb-[17px]'
          placeholder="Tell us what’s working, what’s not, or what you'd love to see…"
        />
        <button
          type='submit'
          disabled={status === "sending" || message.trim() === ""}
          className='text-sm px-3 py-2 bg-black text-white rounded hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed'
        >
          {status === "sending" ? "Sending..." : "Submit Feedback"}
        </button>
      </form>

      {status === "sent" && (
        <p className='text-xs text-green-600 mt-1'>Thanks for your feedback!</p>
      )}
      {status === "error" && (
        <p className='text-xs text-red-600 mt-1'>Something went wrong.</p>
      )}
    </div>
  );
}
