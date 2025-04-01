import { getWaiverByToken } from "@/app/actions/waiver";
import { db } from "@/lib/prisma";
import { notFound, redirect } from "next/navigation";

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

  if (!waiver) return notFound();

  // Expiration logic — 30 days after last view or creation
  //   const cutoff = new Date();
  //   cutoff.setDate(cutoff.getDate() - 30);

  //   const lastActivity = waiver.viewedAt || waiver.date;
  //   if (lastActivity < cutoff) {
  //     redirect(`/waiver/expired/${waiver.id}`);
  //   }

  // ✅ Mark as viewed if not already
  //   await markWaiverViewed(waiver.id);

  return (
    <div className='max-w-xl mx-auto mt-10 border p-6 rounded shadow'>
      <h1 className='text-2xl font-bold mb-4'>Signed Waiver</h1>
      <p>
        <strong>Name:</strong> {waiver.name}
      </p>
      <p>
        <strong>Date:</strong> {new Date(waiver.date).toLocaleString()}
      </p>
      <p>
        <strong>IP Address:</strong> {waiver.ipAddress}
      </p>
      <p>
        <strong>Terms:</strong> {waiver.terms ? "✅ Yes" : "❌ No"}
      </p>
      <p>
        <strong>Liability:</strong> {waiver.liability ? "✅ Yes" : "❌ No"}
      </p>
      <p>
        <strong>Signature:</strong>
      </p>
      <img
        src={`https://uploadthing.com/f/${waiver.signature?.fileKey}`}
        alt='Signature'
        className='mt-2 max-w-xs border'
      />
    </div>
  );
}
