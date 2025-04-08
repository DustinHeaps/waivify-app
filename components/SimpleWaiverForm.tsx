"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRef, useState } from "react";
import SignaturePad from "react-signature-pad-wrapper";
import { saveWaiver } from "@/app/actions/waiver";
import { useRouter } from "next/navigation";
import { v4 as uuidv4 } from "uuid";
import { uploadSignature } from "@/app/actions/signature";

const WaiverSchema = z.object({
  name: z.string().min(1, "Name is required"),
  date: z.string().min(1, "Date is required"),
  terms: z.literal(true, {
    errorMap: () => ({ message: "You must agree to the terms." }),
  }),
  liability: z.literal(true, {
    errorMap: () => ({ message: "You must release liability." }),
  }),
});

type FormData = z.infer<typeof WaiverSchema>;

type Props = {
  slug: string;
  fields: any
};

export default function SimpleWaiverForm({ slug, fields }: Props) {
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(WaiverSchema),
  });

  const sigPadRef = useRef<any>(null);

  const onSubmit = async (data: FormData) => {
    const signatureDataURL = sigPadRef.current?.toDataURL();

    if (!signatureDataURL) {
      console.warn("No signature captured");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      const blob = await (await fetch(signatureDataURL)).blob();
      const file = new File([blob], "signature.png", { type: "image/png" });

      const formData = new FormData();
      formData.append("file", file);
      formData.append("name", data.name);
      formData.append("date", data.date);

      const waiverId = uuidv4();

      const newWaiver = await saveWaiver(
        {
          id: waiverId,
          name: data.name,
          ipAddress: "192.168.1.1",
          terms: data.terms,
          liability: data.liability,
          date: new Date().toISOString(),
        },
        slug
      );

      const signature = await uploadSignature(formData, newWaiver.id);

      router.push(`/waiver/confirmation/${signature.id}`);
    } catch (error) {
      setError("Something went wrong. Please try again.");
      console.error("Upload failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form
      method='post'
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
        <label className='block font-semibold mb-1'>Signature</label>
        <div className='border rounded'>
          <SignaturePad ref={sigPadRef} options={{ penColor: "black" }} />
        </div>
      </div>

      <div>
        <label className='flex items-center space-x-2'>
          <input type='checkbox' {...register("terms" as const)} />
          <span>I agree to the terms & conditions</span>
        </label>
        {errors.terms && (
          <p className='text-red-500 text-sm'>{errors.terms.message}</p>
        )}
      </div>

      <div>
        <label className='flex  items-center space-x-2'>
          <input type='checkbox' {...register("liability" as const)} />
          <span>I release liability for this service</span>
        </label>
        {errors.liability && (
          <p className='text-red-500 text-sm'>{errors.liability.message}</p>
        )}
      </div>

      <button
        type='submit'
        className='bg-teal-500 hover:bg-teal-600 text-white px-6 py-2 rounded disabled:opacity-50 disabled:cursor-not-allowed'
        disabled={isLoading}
      >
        {isLoading ? "Submitting..." : "Submit Waiver"}
      </button>
      {error && <p className='text-red-500 text-sm mt-2'>{error}</p>}
    </form>
  );
}
