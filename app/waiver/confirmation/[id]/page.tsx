import { getSignatureById } from "@/app/actions/signature";

import { format } from "date-fns";
import { notFound } from "next/navigation";

import { SendEmailButton } from "../../components/SendEmailButton";
import WaiverDownloadButton from "../../components/WaiverDownloadButton";
import { CloseButton } from "../../components/CloseButton";
import { getUserById } from "@/app/actions/user";
import { User } from "@prisma/client";

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
  params: Promise<{ id: string }>;
}) {
  const user: User | null = await getUserById();

  const { id } = await params;
  const signature = await getSignatureById(id);

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
            target='_blank'
            href='/policy'
            className='underline hover:text-teal-400'
          >
            Digital Signature Policy
          </a>
          .
        </p>

        <p className='text-center text-sm text-gray-600 mt-4'>
          {user?.name && (
            <>
              <span className='text-red-500'>Submitted by:</span>{" "}
              {signature.name} <br />
            </>
          )}
          <span className='text-red-500'>Confirmation ID:</span> {signature.id}{" "}
          <br />
          <span className='text-red-500'>Submitted on:</span>{" "}
          {format(new Date(signature.uploadedAt), "PPPpp")}
        </p>
        <hr className='my-6 border-t border-gray-200 max-w-xs mx-auto' />
      </div>

      <div className='text-sm mt-5 text-gray-600'>
        <p>Need a copy for your records?</p>
        <div className='flex justify-center items-center gap-2 mt-2 relative'>
          <WaiverDownloadButton waiverId={signature.waiverId} />

          {signature.email && (
            <>
              <span className='text-gray-400'>or</span>
              <SendEmailButton
                id={signature.id}
                waiverId={signature.waiverId}
                email={signature.email}
              />
            </>
          )}
        </div>
      </div>
      <p className='mt-6 text-xs text-gray-400'>
        You’re all set. You may now close this page.
      </p>

      <p className='text-xs text-gray-400 text-center mt-2'>
        Want to collect your own digital waivers?{" "}
        <a
          href='https://waivify.com'
          className='text-blue-600 hover:underline'
          target='_blank'
        >
          Try Waivify
        </a>
      </p>
    </div>
  );
}
