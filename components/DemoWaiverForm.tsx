"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRef, useState } from "react";
import SignaturePad from "react-signature-pad-wrapper";

const WaiverSchema = z.object({
  name: z.string().min(1, "Name is required"),
  date: z.string().min(1, "Date is required"),
  terms: z.literal(true, {
    errorMap: () => ({ message: "You must agree to the terms." }),
  }),
  liability: z.literal(true, {
    errorMap: () => ({ message: "You must release liability." }),
  }),
  email: z
    .string()
    .email("Enter a valid email address")
    .min(1, "Email is required"),
});

type FormData = z.infer<typeof WaiverSchema>;

export default function SimpleWaiverForm() {
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [signatureError, setSignatureError] = useState("");
  const [showSignupPrompt, setShowSignupPrompt] = useState(false);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(WaiverSchema),
  });

  const sigPadRef = useRef<any>(null);

  const onSubmit = async (data: FormData) => {
    setSignatureError("");

    const signatureDataURL = sigPadRef.current?.toDataURL();

    if (sigPadRef.current?.isEmpty()) {
      setSignatureError("Signature is required.");
      return;
    }
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setShowSignupPrompt(true);
    }, 1000);
    setError("");
  };

  return (
    <form
      method='post'
      noValidate
      onSubmit={handleSubmit(onSubmit)}
      className='max-w-md mx-auto space-y-4 p-6 border rounded bg-white shadow-md'
    >
      <div>
        <label className='block font-semibold'>Name</label>
        <input {...register("name")} className='w-full border p-2 rounded' />
        {errors.name && (
          <p className='text-red-500 text-sm'>{errors.name.message}</p>
        )}
      </div>

      <div>
        <label className='block font-semibold'>Date</label>
        <input
          type='date'
          {...register("date")}
          className='w-full border p-2 rounded'
        />
        {errors.date && (
          <p className='text-red-500 text-sm'>{errors.date.message}</p>
        )}
      </div>

      <div>
        <label className='flex text-sm items-center space-x-2'>
          <input type='checkbox' {...register("terms" as const)} />
          <span>I agree to the terms & conditions</span>
        </label>
        {errors.terms && (
          <p className='text-red-500 text-sm'>{errors.terms.message}</p>
        )}
      </div>
      <div className='mb-4'>
        <label className='text-sm font-normal text-black mb-1 block'>
          Email
        </label>
        <input
          type='email'
          {...register("email" as const)}
          className={`w-full px-3 py-2 border rounded-md shadow-sm ${
            errors.email ? "border-red-500" : "border-gray-300"
          }`}
        />
        {errors.email && (
          <p className='text-red-500 text-sm mt-1'>
            {(errors.email as any)?.message}
          </p>
        )}
      </div>
      <div>
        <label className='flex text-sm items-center space-x-2'>
          <input type='checkbox' {...register("liability" as const)} />
          <span>I release liability for this service</span>
        </label>
        {errors.liability && (
          <p className='text-red-500 text-sm'>{errors.liability.message}</p>
        )}
      </div>
      <div>
        <label className='block font-semibold mb-1'>Signature</label>
        <div className='border rounded'>
          <SignaturePad ref={sigPadRef} options={{ penColor: "black" }} />
        </div>
        {signatureError && (
          <p className='text-red-500 text-sm mt-1'>{signatureError}</p>
        )}
      </div>
      <div className='mt-2 text-xs text-center text-muted-foreground'>
        Want clients to book before signing?{" "}
        <span className='text-blue-600 underline hover:text-blue-700 cursor-pointer'>
          Add a Calendly link →
        </span>
        <div className='mt-1 text-[11px] text-gray-400 italic'>
          (Pro feature)
        </div>
      </div>
      <div className='flex justify-center'>
        <button
          type='submit'
          className='btn-navy px-6 py-2 rounded disabled:opacity-50 disabled:cursor-not-allowed'
          disabled={isLoading}
        >
          {isLoading ? "Submitting..." : "Submit Waiver"}
        </button>
      </div>
      {showSignupPrompt && (
        <p className='text-sm text-muted-foreground mt-2 text-center'>
          Sign up to save or submit this waiver.
        </p>
      )}
      {error && <p className='text-red-500 text-sm mt-2'>{error}</p>}
    </form>
  );
}
