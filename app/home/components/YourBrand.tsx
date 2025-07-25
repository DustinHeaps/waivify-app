import { Card } from "@/components/ui/card";
import { slugify } from "@/lib/utils";
import { User } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";

export default function YourBrand({
  plan,
  user,
}: {
  plan: "free" | "starter" | "pro";
  user: User;
}) {
  const companyName = user?.companyName || "My Company";
  const logoUrl = user?.logoUrl || "";
  // const sluggified = slugify(companyName as string);
  const hasBrand = !!logoUrl && !!companyName;

  return (
    <div className='rounded-xl border p-6 shadow-sm bg-muted/50'>
      <h2 className='text-lg font-semibold text-gray-900 mb-2'>Your Brand</h2>
      <p className='text-sm text-gray-600 mb-4'>
        This is how your business appears on public waivers. Update your logo,
        company name, and shareable link.
      </p>

      <div className='flex items-center gap-4 mb-4'>
        <div className='h-12 w-12 rounded-full bg-gray-100 overflow-hidden flex items-center justify-center text-sm text-muted'>
          {logoUrl ? (
            <Image src={logoUrl} alt='Logo' width={48} height={48} />
          ) : (
            <>Logo</>
          )}
        </div>
        <div>
          <p className='font-medium text-gray-900'>
            {companyName || "My Company"}
          </p>
          <p className='text-sm text-gray-600'>
            waivify.com/{user?.slug || ""}
          </p>
        </div>
      </div>

      <Link
        href='/account'
        className='block text-center w-full bg-[#000080] text-white text-sm font-medium px-4 py-2 rounded hover:bg-[#000080]/90 transition'
      >
        Customize Branding
      </Link>
    </div>
  );
}
