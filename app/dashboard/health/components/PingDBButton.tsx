"use client";

import { useState } from "react";
import { pingDb } from "@/app/actions/health"; // adjust path if needed

export function PingDBButton() {
  const [status, setStatus] = useState<"Connected" | "Error" | "Checking">(
    "Connected"
  );

  const handlePing = async () => {
    setStatus("Checking");
    const res = await pingDb();
    setStatus(res.status as "Connected" | "Error");
  };

  return (
    <button
      onClick={handlePing}
      className='mt-4 inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 text-sm'
    >
      {status === "Checking" ? "Pinging..." : "Ping Database"}
    </button>
  );
}
