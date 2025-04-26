import { getWaiverByToken } from "@/app/actions/waiver";
import { db } from "@/lib/prisma";
import { notFound, redirect } from "next/navigation";
import WaiverDownloadButton from "../components/WaiverDownloadButton";
import { getUserById } from "@/app/actions/user";
import Image from "next/image";

type PageProps = {
  params: Promise<{ token: string }>;
};

export default async function ViewWaiverPage({ params }: PageProps) {
  const { token } = await params;
  const waiver = await db.waiver.findUnique({
    where: { token: token },
    include: {
      signature: true,
    },
  });

  const user = await getUserById();

  if (!waiver) return notFound();

  return (
    <div className='max-w-xl mx-auto mt-10 border p-6 rounded shadow'>
      <div className='flex justify-between items-center border-b pb-2'>
        {user?.plan === "pro" && user.logoUrl && (
          <div className='flex items-center gap-3'>
            <Image
              src={user.logoUrl}
              alt='Company Logo'
              width={40}
              height={40}
              className='rounded-md'
            />
            <p className='font-semibold text-sm text-gray-700'>
              {user.companyName}
            </p>
          </div>
        )}
        <h1 className='text-2xl  font-bold'>Signed Waiver</h1>
        {user?.plan !== "free" && <WaiverDownloadButton waiverId={waiver.id} />}
      </div>
      <p className='py-2 '>
        <b className='font-medium'>Waiver ID:</b>{" "}
        <span className='font-mono text-xs bg-gray-100 px-1 rounded'>
          WVR-{waiver.id.slice(0, 6).toUpperCase()}
        </span>
      </p>
      {waiver.fields && (
        <div className=''>
          {Object.entries(waiver.fields).map(([label, value]) => (
            <p className='py-2' key={label}>
              <span className='font-medium'>{label}:</span>{" "}
              <span className='text-sm'>
                {typeof value === "boolean"
                  ? value
                    ? "✅ Yes"
                    : "❌ No"
                  : value}
              </span>
            </p>
          ))}
        </div>
      )}

      <p className='font-medium'>Signature:</p>
      <img
        src={`https://uploadthing.com/f/${waiver.signature?.fileKey}`}
        alt='Signature'
        className='mt-2 max-w-xs border'
      />
    </div>
  );
}
