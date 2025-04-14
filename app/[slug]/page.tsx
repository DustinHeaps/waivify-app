import { db } from "@/lib/prisma";
import { notFound } from "next/navigation";
import WaiverForm from "@/components/WaiverForm";
import WaiverLimitGuard from "@/components/WaiverGuard";
import { auth } from "@clerk/nextjs/server";

export const metadata = {
  title: "Sign Your Waiver – Fast & Secure | Powered by Waivify",
  description:
    "Fill out and sign your waiver online in seconds. Waivify makes digital waiver signing fast, secure, and effortless.",
  keywords: [
    "sign waiver online",
    "digital waiver form",
    "e-sign waiver",
    "Waivify signature",
    "fill out consent form",
  ],
};

type PageProps = {
  params: Promise<{ slug: string }>;
};

export default async function PublicWaiverPage({ params }: PageProps) {
  const { slug } = await params;
  const { userId } = await auth();

  const business = await db.user.findFirst({
    where: { slug },
    include: {
      Template: {
        orderBy: [{ isDefault: "desc" }, { createdAt: "desc" }],
        take: 1,
        where: {
          fields: {
            not: []
          },
        },
      },
    },
  });

  const isOwner = business?.clerkId === userId;

  if (!business) return notFound();

  const template = business.Template;

  return (
    <WaiverLimitGuard>
      {isOwner && (
        <div className='mb-4 rounded bg-blue-50 border border-blue-200 text-blue-700 p-3 text-sm text-center'>
          You're viewing your own public waiver form as a visitor would.
        </div>
      )}
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

        <WaiverForm
          slug={slug}
          templateId={business.Template[0].id}
          fields={business.Template[0].fields}
          isOwner={isOwner}
        />
      </div>
    </WaiverLimitGuard>
  );
}
