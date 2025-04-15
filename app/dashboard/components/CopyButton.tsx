"use client";

import clsx from "clsx";
import { useState } from "react";

export default function CopyButton({
  text,
  className,
}: {
  text: string;
  className?: string;
}) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      className={clsx(className)}

      onClick={handleCopy}
    >
      {copied ? "Copied!" : "Copy"}
    </button>
  );
}
