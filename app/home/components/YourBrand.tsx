import { Card } from "@/components/ui/card";
import { User } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";

export default function YourBrand({
  plan,
  user,
}: {
  plan: "free" | "starter" | "pro";
  user?: User;
}) {
  const hasBrand = !!user?.logoUrl && !!user?.companyName;
  const publicUrl = `https://waivify.com/${user?.slug}`;

  return (
    <Card className='p-4 space-y-2 gap-0'>
      <h2 className='font-semibold'>Your Brand</h2>
      <p className='text-xs text-muted-foreground'>
        This is how your business appears on public waivers. Update your logo,
        company name, and shareable link.
      </p>
      <div className='flex items-center gap-4 py-1'>
        <div className='h-12 w-12 rounded-full bg-gray-100 overflow-hidden'>
          {user?.logoUrl ? (
            <Image src={user?.logoUrl} alt='Logo' width={48} height={48} />
          ) : (
            <div className='flex items-center justify-center text-sm text-muted'>
              Logo
            </div>
          )}
        </div>
        <div>
          <p className='font-medium'>{user?.companyName || "The Company"}</p>
          <p className='text-sm text-muted-foreground'>
            waivify.com/{user?.slug || "undefined"}
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
          ></Link>
        )}
      </div>
    </Card>
  );
}
