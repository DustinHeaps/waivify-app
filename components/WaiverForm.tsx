"use client";

import { useForm } from "react-hook-form";
import { z, ZodTypeAny } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useRef, useState } from "react";
import SignaturePad from "react-signature-pad-wrapper";
import { saveWaiver } from "@/app/actions/waiver";
import { useRouter } from "next/navigation";
import { v4 as uuidv4 } from "uuid";
import { uploadSignature } from "@/app/actions/signature";
import { getNameFieldValue } from "@/lib/utils";
import { incrementWaiverUsage } from "@/lib/waiverUsage";

type Props = {
  slug: string;
  fields: any;
  templateId: string;
  isOwner?: boolean;
};

const buildSchema = (fields: any[]) => {
  const shape: Record<string, ZodTypeAny> = {};

  fields.forEach((field) => {
    if (field.type === "signature") {
      return;
      //   shape[field.label] = z.string().min(1, `${field.label} is required`);
    } else if (field.required) {
      if (field.type === "checkbox") {
        shape[field.label] = z.literal(true, {
          errorMap: () => ({ message: `${field.label} must be checked.` }),
        });
      } else {
        shape[field.label] = z.string().min(1, `${field.label} is required`);
      }
    } else {
      shape[field.label] = z.any();
    }
  });

  shape["terms"] = z.literal(true, {
    errorMap: () => ({ message: "You must agree to the terms." }),
  });

  shape["liability"] = z.literal(true, {
    errorMap: () => ({ message: "You must release liability." }),
  });

  return z.object(shape);
};
export default function WaiverForm({
  slug,
  fields,
  templateId,
  isOwner,
}: Props) {
  const [formError, setFormError] = useState("");
  const [signatureError, setSignatureError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();
  const schema = buildSchema(fields);

  type FormData = z.infer<typeof schema>;

  const {
    setValue,
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  useEffect(() => {
    register("signature", { required: true });
  }, [register]);

  const sigPadRef = useRef<any>(null);

  const onSubmit = async (data: FormData) => {
    setSignatureError("");

    const signatureDataURL = sigPadRef.current?.toDataURL();

    if (sigPadRef.current?.isEmpty()) {
      setSignatureError("Signature is required.");
      return;
    }

    setValue("Signature", signatureDataURL);

    setIsLoading(true);
    setFormError("");

    try {
      const blob = await (await fetch(signatureDataURL)).blob();
      const file = new File([blob], "signature.png", { type: "image/png" });

      const formData = new FormData();
      formData.append("file", file);

      const name = getNameFieldValue(data);
      formData.append("name", name as string);

      const waiverId = uuidv4();

      const newWaiver = await saveWaiver(
        {
          fields: data,
          id: waiverId,
          name: data.name,
          ipAddress: "192.168.1.1",
          terms: data.terms,
          liability: data.liability,
          date: new Date().toISOString(),
          templateId,
        },
        slug
      );

      const date = newWaiver.date;
      const signature = await uploadSignature(formData, newWaiver.id, date);

      router.push(`/waiver/confirmation/${signature.id}`);
    } catch (error) {
      setFormError("Something went wrong. Please try again.");
      console.error("Upload failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form
      method='post'
      onSubmit={handleSubmit(onSubmit)}
      className='w-full max-w-md bg-white shadow-md rounded-md p-6 space-y-4'
    >
      {fields.map((field: any) => (
        <div key={field.label} className='mb-4'>
          {field.type === "checkbox" ? (
            <label className='flex items-center gap-2 text-xs font-medium text-gray-700'>
              <input
                type='checkbox'
                {...register(field.label)}
                className='h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary'
              />
              {field.label}
            </label>
          ) : (
            <>
              <label className='text-sm font-normal text-black mb-1 block'>
                {field.label}
              </label>
              <input
                type={field.type}
                {...register(field.label)}
                className={`w-full px-3 py-2 border rounded-md shadow-sm ${
                  (errors as Record<string, any>)[field.label]
                    ? "border-red-500"
                    : "border-gray-300"
                }`}
              />
            </>
          )}

          {(errors as Record<string, any>)[field.label] && (
            <p className='text-red-500 text-sm mt-1'>
              {(errors as Record<string, any>)[field.label]?.message}
            </p>
          )}
        </div>
      ))}

      <div>
        <label className='flex text-xs items-center space-x-2'>
          <input type='checkbox' {...register("terms" as const)} />
          <span>I agree to the terms & conditions</span>
        </label>
        {errors.terms && (
          <p className='text-red-500 text-sm'>
            {(errors.terms as any)?.message}
          </p>
        )}
      </div>

      <div>
        <label className='flex text-xs items-center space-x-2'>
          <input type='checkbox' {...register("liability" as const)} />
          <span>I release liability for this service</span>
        </label>
        {errors.liability && (
          <p className='text-red-500 text-sm'>
            {(errors.liability as any)?.message}
          </p>
        )}
      </div>

      <div className='mt-4'>
        <label className='block text-sm font-normal text-black mb-1'>
          Signature
        </label>
        <div className='border rounded-md'>
          <SignaturePad ref={sigPadRef} />
        </div>
        {signatureError && (
          <p className='text-red-500 text-sm mt-1'>{signatureError}</p>
        )}
      </div>
      {isOwner ? (
        <button
          type='button'
          disabled
          className='bg-gray-100 text-gray-500 px-4 py-2 rounded cursor-not-allowed border border-gray-300 w-full text-sm'
        >
          This form is disabled for owners
        </button>
      ) : (
        <button
          type='submit'
          className='bg-teal-500 text-white px-4 py-2 rounded hover:bg-teal-600 transition'
          disabled={isLoading}
        >
          {isLoading ? "Submitting..." : "Submit Waiver"}
        </button>
      )}
    </form>
  );
}
// }
