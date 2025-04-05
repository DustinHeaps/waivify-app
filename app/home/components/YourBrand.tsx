import Image from "next/image";
import Link from "next/link";

export default function YourBrand({
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
  const hasBrand = !!logoUrl && !!companyName;
  const publicUrl = `https://waivify.com/${slug || ""}`;

  return (
    <div className='flex flex-col md:flex-row justify-between items-start gap-6 p-5 border rounded-lg bg-white shadow-sm'>
      {/* Left column */}
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
            <p className='font-semibold'>{companyName || "The Company"}</p>
            <p className='text-sm text-muted-foreground'>
              waivify.com/{slug || "undefined"}
            </p>
          </div>
        </div>

        <div className='flex gap-3 mt-2'>
          <Link
            href={publicUrl}
            target='_blank'
            className='text-sm px-3 py-1.5 bg-black text-white rounded hover:bg-gray-800'
          >
            View Public Waiver
          </Link>
          <Link
            href='/account'
            className='text-sm px-3 py-1.5 bg-gray-100 rounded hover:bg-gray-200'
          >
            Customize Branding
          </Link>
        </div>

        {/* Conditional QR setup CTA */}
        {!hasBrand && (
          <p className='text-xs text-muted-foreground border rounded px-3 py-2 mt-2'>
            Add your logo and company name to unlock a sharable QR code.
          </p>
        )}

        {/* Watermark note */}
        <p className='text-xs text-muted-foreground mt-2'>
          “Powered by Waivify” will be visible to clients.{" "}
          {plan !== "pro" && (
            <Link href='/upgrade' className='text-blue-600 underline'>
              Upgrade to remove
            </Link>
          )}
        </p>
      </div>

      {/* Right column: QR Preview */}
      <div className='hidden md:flex items-center justify-center w-40 h-40 bg-gray-100 rounded'>
        {hasBrand ? (
          <Image
            src={`https://api.qrserver.com/v1/create-qr-code/?data=${publicUrl}&size=160x160`}
            alt='QR Code'
            width={160}
            height={160}
          />
        ) : (
          <p className='text-xs text-muted-foreground text-center px-2'>
            QR code preview will appear here
          </p>
        )}
      </div>
    </div>
  );
}
