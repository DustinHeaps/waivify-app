import { getWaiverByToken } from '@/app/actions/waiver';
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";

interface WaiverDetailProps {
  params: { id: string };
}

export default async function WaiverDetail({ params }: WaiverDetailProps) {
  const waiverId = params.id;

 
  const waiver = await getWaiverByToken(waiverId); 

  if (!waiver) return notFound();

  return (
    <div className='max-w-2xl mx-auto p-6 space-y-6 bg-white rounded-xl shadow'>
      <div className='space-y-1'>
        <h1 className='text-2xl font-semibold'>Signed Waiver</h1>
        <p>
          <strong>Name:</strong> {waiver.name}
        </p>
        <p>
          <strong>Date:</strong> {new Date(waiver.date).toLocaleString()}
        </p>
        <p>
          <strong>ID:</strong> {waiver.id}
        </p>
        {waiver.ipAddress && (
          <p>
            <strong>IP Address:</strong> {waiver.ipAddress}
          </p>
        )}
      </div>

      <div className='border-t pt-4'>
        <h2 className='text-lg font-medium mb-2'>Waiver Terms</h2>
        <p className='whitespace-pre-wrap'>{waiver.terms}</p>
        <ul className='mt-4 space-y-1'>
          <li>✅ Release of liability: {waiver.liability ? "Yes" : "No"}</li>
          <li>✅ Accepted terms: {waiver.terms ? "Yes" : "No"}</li>
        </ul>
      </div>

      <div>
        <h2 className='text-lg font-medium mb-2'>Signature</h2>
        {/* {waiver.signatureUrl ? (
          <img
            src={waiver.signatureUrl}
            alt='Signature'
            className='w-full max-w-sm'
          />
        ) : ( */}
          <p>No signature on file.</p>
        {/* )} */}
      </div>

      <div className='flex gap-4'>
        <button className='bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700'>
          Download PDF
        </button>
        <button className='bg-gray-200 px-4 py-2 rounded hover:bg-gray-300'>
          Back to Dashboard
        </button>
      </div>
    </div>
  );
}


