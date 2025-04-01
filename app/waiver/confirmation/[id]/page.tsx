import { getSignatureById } from "@/app/actions/signature";

import { format } from "date-fns";
import { notFound } from "next/navigation";
import { ReturnHomeButton } from '../../components/ReturnHomeButton';
import { SendEmailButton } from '../../components/SendEmailButton';

export const metadata = {
  title: "Waiver Signed – Confirmation | Waivify",
  description:
    "Your waiver was submitted successfully. Waivify keeps your digital documents safe and accessible.",
  keywords: [
    "waiver confirmation",
    "signature complete",
    "form submitted",
    "thank you waiver",
    "Waivify confirmation",
  ],
};

export default async function ConfirmationPage({
  params,
}: {
  params: { id: string };
}) {
  const signature = await getSignatureById(params.id);

  if (!signature) {
    notFound();
  }

  return (
    <div className='max-w-md mx-auto mt-20 bg-white p-6 rounded-xl shadow-md text-center'>
      <div className='text-center mt-10'>
        <h1 className='text-2xl font-bold text-green-600'>
          ✅ Waiver Submitted
        </h1>
        <p className='text-sm text-gray-500 mt-4 text-center'>
          Your waiver has been securely submitted. All waivers are legally
          binding under our{" "}
          <a
            href='/policy'
            className='underline hover:text-teal-400'
          >
            Digital Signature Policy
          </a>
          .
        </p>

        <p className='text-center text-sm text-gray-600 mt-4'>
          <span className='text-red-500'>Submitted by:</span> {signature.name}{" "}
          <br />
          <span className='text-red-500'>Confirmation ID:</span> {signature.id}{" "}
          <br />
          <span className='text-red-500'>Submitted on:</span>{" "}
          {format(new Date(signature.uploadedAt), "PPPpp")}
        </p>
        <hr className='my-6 border-t border-gray-200 max-w-xs mx-auto' />

        <ReturnHomeButton />
      </div>

      <p className='text-sm mt-5'>
        <span>Need</span> a copy? <br />
        <div className='flex justify-center relative'>
          {/* <WaiverDownloadButton waiverId={signature.waiverId} /> */}
          or
          {/* <SendEmailButton id={signature.id} waiverId={signature.waiverId} /> */}
        </div>
      </p>
    </div>
  );
}
