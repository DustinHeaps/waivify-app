"use client";

// import { downloadWaiverPdf } from "@/app/actions/waiver";
import { useTransition } from "react";

type Props = {
  waiverId: string;
};

export default function WaiverDownloadButton({ waiverId }: Props) {
  const [isPending, startTransition] = useTransition();

  const handleDownload = async () => {
    startTransition(async () => {
      try {
        const res = await fetch(`/api/download?waiverId=${waiverId}`);
        if (!res.ok) throw new Error("Failed to fetch PDF");

        const blob = await res.blob();
        const url = URL.createObjectURL(blob);

        const a = document.createElement("a");
        a.href = url;
        a.download = `waiver-${waiverId}.pdf`;
        a.click();
        URL.revokeObjectURL(url);
      } catch (err) {
        console.error("Download failed", err);
      }
    });
  };

  return (
    <button
      onClick={handleDownload}
      className='text-blue-500 hover:underline mr-1'
      disabled={isPending}
    >
        {isPending ? "Downloading..." : "Download PDF"}
    </button>
  );
}
