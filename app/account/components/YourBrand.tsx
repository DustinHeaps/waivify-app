import CopyButton from "@/app/dashboard/components/CopyButton";
import { Button } from "@/components/ui/button";
import { slugify } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export function YourBrand({
  logoUrl,
  companyName,
  slug,
  plan,
}: {
  logoUrl?: string;
  companyName?: string;
  slug?: string;
  plan: "free" | "starter" | "pro";
}) {
  const [copied, setCopied] = useState(false);
  // const sluggified = slugify(companyName as string)

  const publicUrl: string = `https://waivify.com/${slug as string}`;
  const hasBrand = !!logoUrl && !!companyName;

  const handleCopy = async () => {
    await navigator.clipboard.writeText(publicUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className='flex flex-col md:flex-row justify-between items-start gap-6 p-5 border rounded-lg bg-muted/50 shadow-sm'>
      <div className='flex-1 space-y-2'>
        <h2 className='text-lg font-semibold'>Your Brand</h2>

        <div className='flex items-center gap-4'>
          <div className='h-12 w-12 rounded-full bg-muted flex items-center justify-center text-sm font-medium overflow-hidden'>
            {logoUrl ? (
              <Image src={logoUrl} alt='Logo' width={48} height={48} />
            ) : (
              "Logo"
            )}
          </div>
          <div>
            <p className='font-semibold'>{companyName || "My Company"}</p>
            <p className='text-sm text-muted-foreground'>
              waivify.com/{slug || ""}
            </p>
          </div>
        </div>

        <div className='flex gap-3 mt-2'>
          <Link
            href={publicUrl}
            target='_blank'
            className='btn-navy text-sm px-3 py-1.5 rounded '
          >
            View Public Waiver
          </Link>

          <Button className='btn-secondary text-sm hover:text-[#000080] hover:bg-opacity-10 text-[#000080]' variant='outline' size='sm' onClick={handleCopy}>
            {!copied ? "Copy Link" : "Copied"}
          </Button>
        </div>

        <p className='text-sm text-muted-foreground mt-2'>
          Want to start collecting signatures? Share your link or display your
          QR code at your location.
        </p>
        {plan !== "pro" && (
          <p className='text-xs text-muted-foreground mt-2'>
            “Powered by Waivify.com” will be visible to clients.{" "}
            <Link href='/billing' className='text-blue-600 underline'>
              Upgrade to pro to remove
            </Link>
          </p>
        )}
      </div>

      <div className='hidden md:flex flex-col items-center justify-center w-40 bg-gray-50 p-3 rounded'>
        <>
          <Image
            src={`https://api.qrserver.com/v1/create-qr-code/?data=${publicUrl}&size=160x160`}
            alt='QR Code'
            width={160}
            height={160}
            className='rounded border'
          />
          <p className='text-xs text-muted-foreground text-center px-2 mt-2'>
            Clients can scan this to sign your waiver. Perfect for front desks,
            lobbies, or event tables.
          </p>
          <a
            href={`https://api.qrserver.com/v1/create-qr-code/?data=${publicUrl}&size=160x160`}
            download='waivify-qr.png'
            className='mt-2 text-xs font-medium text-blue-600 hover:underline hover:text-blue-700 transition'
            target='_blank'
          >
            Download QR Code
          </a>
        </>
      </div>
    </div>
  );
}
