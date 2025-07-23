
"use client";

import { useState } from "react";
import { publishToDevto } from "@/app/actions/post";

export default function BlogToolsPage() {
  const [slug, setSlug] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  async function handleSubmit() {
    setLoading(true);
    setMessage("");
    try {
      const res = await publishToDevto(slug);
      setMessage("✅ Draft created: " + res.url);
    } catch (err: any) {
      setMessage("❌ Error: " + err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className='p-4 max-w-md mx-auto'>
      <h1 className='text-xl font-semibold mb-4'>
        Publish Blog Post to Dev.to
      </h1>
      <input
        type='text'
        placeholder='Enter slug (e.g. my-first-post)'
        value={slug}
        onChange={(e) => setSlug(e.target.value)}
        className='border px-3 py-2 w-full mb-2 rounded'
      />
      <button
        onClick={handleSubmit}
        disabled={loading}
        className='bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50'
      >
        {loading ? "Publishing..." : "Publish Draft"}
      </button>
      {message && <p className='mt-3 text-sm'>{message}</p>}
    </div>
  );
}
