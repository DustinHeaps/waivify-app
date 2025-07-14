import { notFound } from "next/navigation";
import WaiverForm from "@/components/WaiverForm";
import WaiverLimitGuard from "@/components/PlanGuard";
import { auth } from "@clerk/nextjs/server";
import { markWaiverViewed } from "../actions/analytics";
import SimpleWaiverForm from "@/components/SimpleWaiverForm";
import { getUserById, getUserBySlug } from "../actions/user";

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
  await markWaiverViewed("Slug");

  const { slug } = await params;
  const { userId } = await auth();
  const user = await getUserById();
  const business = await getUserBySlug(slug);

  const isOwner = business?.clerkId === userId;

  if (!business) return notFound();

  return (
    <div className='bg-gray-100 min-h-screen'>
      {isOwner && (
        <div className='mb-4 rounded bg-blue-50 border border-blue-200 text-blue-700 p-3 text-sm text-center'>
          You're viewing your own public waiver form as a visitor would.
        </div>
      )}
      <div className='max-w-xl mx-auto p-6 space-y-6 '>
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

        <WaiverForm
          plan={user?.plan as string}
          slug={slug}
          templateId={business.publicTemplateId as string}
          fields={business.Template?.fields}
          isOwner={isOwner}
        />
      </div>
    </div>
  );
}
