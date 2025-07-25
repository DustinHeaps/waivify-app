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
import { getEmailFieldValue, getNameFieldValue } from "@/lib/utils";
import { getTemplateById } from "@/app/actions/template";

import { checkCalendlyBooking } from "@/app/actions/calendly";
import { useDebounce } from "use-debounce";

type Props = {
  plan: string;
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

  shape["email"] = z
    .string()
    .email("Enter a valid email address")
    .min(1, "Email is required");

  shape["terms"] = z.literal(true, {
    errorMap: () => ({ message: "You must agree to the terms." }),
  });

  shape["liability"] = z.literal(true, {
    errorMap: () => ({ message: "You must release liability." }),
  });

  return z.object(shape);
};
export default function WaiverForm({
  plan,
  slug,
  fields,
  templateId,
  isOwner,
}: Props) {
  const [formError, setFormError] = useState("");
  const [signatureError, setSignatureError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [calendlyUrl, setCalendlyUrl] = useState("");
  const [hasCalendlyBooking, setHasCalendlyBooking] = useState<boolean | null>(
    null
  );
  const [checkingBooking, setCheckingBooking] = useState(false);

  const router = useRouter();
  const schema = buildSchema(fields);

  type FormData = z.infer<typeof schema>;

  const {
    setValue,
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const [email] = useDebounce(watch("email"), 600);

  useEffect(() => {
    const handleFocus = async () => {
      if (!email || !calendlyUrl || hasCalendlyBooking) return;

      setCheckingBooking(true);
      try {
        const booked = await checkCalendlyBooking(email, calendlyUrl);
        setHasCalendlyBooking(booked);
      } catch (err) {
        console.error("Error rechecking booking:", err);
      } finally {
        setCheckingBooking(false);
      }
    };

    window.addEventListener("focus", handleFocus);
    return () => window.removeEventListener("focus", handleFocus);
  }, [email, calendlyUrl, hasCalendlyBooking]);

  useEffect(() => {
    const fetchTemplateAndCheckBooking = async () => {
      if (!templateId) return;

      const template = await getTemplateById(templateId);
      const url = template?.calendlyUrl || "";
      setCalendlyUrl(url);

      if (url && email) {
        setCheckingBooking(true);
        try {
          const booked = await checkCalendlyBooking(email, url);
          setHasCalendlyBooking(booked);
        } catch (err) {
          console.error("Error checking booking:", err);
          setHasCalendlyBooking(false);
        } finally {
          setCheckingBooking(false);
        }
      }
    };

    fetchTemplateAndCheckBooking();
  }, [templateId, email]);

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

      const email = getEmailFieldValue(data);
      formData.append("email", email as string);

      if (calendlyUrl) {
        const hasBooking = await checkCalendlyBooking(
          email as string,
          calendlyUrl
        );
        if (!hasBooking) {
          setFormError(
            "Please schedule your session before signing the waiver."
          );
          setIsLoading(false);
          return;
        }
      }

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
    <div className='w-full max-w-md bg-white shadow-md rounded-md p-6 space-y-4'>
      {/* {checkingBooking ? (
          <div className='bg-gray-50 border border-gray-300 text-gray-700 p-4 rounded-md mb-6'>
            Checking booking status...
          </div>
        ) :  */}
      {/*         
      {hasCalendlyBooking ? (
        <div className='bg-green-50 border border-green-300 text-green-800 p-4 rounded-md mb-6'>
          ✅ Your session is booked. You're good to sign the waiver.
        </div>
      ) : calendlyUrl ? (
        <div className='bg-yellow-100 border border-yellow-300 text-yellow-800 p-4 rounded-md mb-6'>
          ⚠️ <strong>Please schedule your session here first:</strong>
          <br />
          <a
            href={calendlyUrl}
            target='_blank'
            rel='noopener noreferrer'
            className='underline text-blue-600'
          >
            Click to book via Calendly
          </a>
          <div>Then come back to sign this waiver.</div>
        </div>
      ) : null} */}

      <form
        method='post'
        noValidate
        onSubmit={handleSubmit(onSubmit)}
        className='w-full max-w-md bg-white shadow-md rounded-md p-6 space-y-4'
      >
        {fields.map((field: any) => (
          <div key={field.label} className='mb-4'>
            {field.type === "checkbox" ? (
              <label className='flex items-center gap-2 text-sm font-medium text-gray-700'>
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
        {email &&
          schema.shape.email.safeParse(email).success &&
          calendlyUrl &&
          !hasCalendlyBooking && (
            <div className='text-sm bg-yellow-100 border border-yellow-300 text-yellow-800 p-4 rounded-md mb-6'>
              ⚠️ <strong>Please schedule your session here first:</strong>
              <br />
              <a
                href={calendlyUrl}
                target='_blank'
                rel='noopener noreferrer'
                className='underline text-blue-600'
              >
                Click to book via Calendly
              </a>
              <div>Then come back to sign this waiver.</div>
            </div>
          )}
        {hasCalendlyBooking && (
          <div className='text-sm bg-green-50 border border-green-300 text-green-800 p-4 rounded-md mb-6'>
            ✅ Your session is booked. You're good to sign the waiver.
          </div>
        )}

        <div>
          <label className='flex text-sm items-center space-x-2'>
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
          <label className='flex text-sm items-center space-x-2'>
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
            You're viewing your own waiver. This form is disabled.
          </button>
        ) : (
          <button
            type='submit'
            className='w-full btn-navy text-white px-4 py-2 rounded'
            disabled={isLoading}
          >
            {isLoading ? "Submitting..." : "Submit Waiver"}
          </button>
        )}
      </form>
    </div>
  );
}
