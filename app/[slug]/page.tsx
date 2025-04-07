import { db } from "@/lib/prisma";
import { notFound } from "next/navigation";
import WaiverForm from "@/components/WaiverForm";
import SimpleWaiverForm from "@/components/SimpleWaiverForm";

type PageProps = {
  params: Promise<{slug: string }>
};

export default async function PublicWaiverPage({ params }: PageProps) {

  const { slug } = await params;

  // Find user by slug
  const business = await db.user.findFirst({
    where: { slug },
  
  });

  if (!business) return notFound();

  return (
    <div className='max-w-xl mx-auto p-6 space-y-6'>
      {/* Branding */}
      <div className='flex items-center gap-3'>
        {business.logoUrl && (
          <img
            src={business.logoUrl}
            alt='Company Logo'
            className='w-10 h-10 rounded'
          />
        )}
        <h1 className='text-xl font-semibold'>{business.companyName}</h1>
      </div>

      {/* Waiver form */}
      <SimpleWaiverForm slug={slug} />
    </div>
  );
}
