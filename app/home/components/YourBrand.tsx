import { Card } from "@/components/ui/card";
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
    <Card className='p-4 space-y-2'>
      <h2 className='font-semibold'>Your Brand</h2>

      <div className='flex items-center gap-4'>
        <div className='h-12 w-12 rounded-full bg-gray-100 overflow-hidden'>
          {logoUrl ? (
            <Image src={logoUrl} alt='Logo' width={48} height={48} />
          ) : (
            <div className='flex items-center justify-center text-sm text-muted'>
              Logo
            </div>
          )}
        </div>
        <div>
          <p className='font-medium'>{companyName || "The Company"}</p>
          <p className='text-sm text-muted-foreground'>
            waivify.com/{slug || "undefined"}
          </p>
        </div>
      </div>

      <div className='flex gap-2 mt-2'>
        <Link
          href='/account'
          className='text-sm px-3 py-1.5 bg-gray-100 rounded hover:bg-gray-200'
        >
          Customize Branding
        </Link>
        {plan !== "pro" && (
          <Link
            href='/upgrade'
            className='text-sm text-muted-foreground underline'
          >
            {/* Upgrade to remove Waivify badge */}
          </Link>
        )}
      </div>
    </Card>

  );
}
