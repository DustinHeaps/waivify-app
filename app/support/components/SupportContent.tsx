"use client";

import { sendSupportEmail } from '@/app/actions/email';
import { zodResolver } from '@hookform/resolvers/zod';
import React, { useState } from "react";
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const SupportSchema = z.object({
    email: z.string().email({ message: "Valid email required" }),
    subject: z.string().min(1, { message: "Subject is required" }),
    message: z.string().min(1, { message: "Message is required" }),
  });
  
  type SupportFormData = z.infer<typeof SupportSchema>;
  
  

export const SupportContent = () => {
  const [submitted, setSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<SupportFormData>({
    resolver: zodResolver(SupportSchema),
  });

  const onSubmit = async (data: SupportFormData) => {
    const res = await sendSupportEmail({
      name: "Support Form",
      subject: data.subject,
      email: data.email,
      message: data.message,
    });

    if (res.success) {
      setSubmitted(true);
      reset();
    }
  };
  return (
    <div className='max-w-2xl mx-auto px-4 py-16'>
      <div className='text-center mb-12'>
        <h1 className='text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white'>
          Contact Waivify Support
        </h1>
        <p className='mt-2 text-lg text-gray-600 dark:text-gray-300'>
          Have questions about waivers, billing, or your account? We're here to
          help.
        </p>
      </div>

      {submitted ? (
        <div className='bg-green-100 text-green-800 text-center py-8 rounded-lg'>
          <h2 className='text-2xl font-semibold'>
            Thanks! We'll be in touch soon. 👋
          </h2>
        </div>
      ) : (
        <form
          onSubmit={handleSubmit(onSubmit)}
          className='space-y-6 bg-muted p-6 rounded-lg'
        >
          <div>
            <label
              htmlFor='email'
              className='block text-sm font-medium text-gray-700 dark:text-gray-300'
            >
              Your Email
            </label>
            <input
              id='email'
              type='email'
              {...register("email")}
              className='mt-2 w-full rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 p-3 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500'
            />
            {errors.email && (
              <p className='text-red-500 text-sm mt-1'>
                {errors.email.message}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor='subject'
              className='block text-sm font-medium text-gray-700 dark:text-gray-300'
            >
              Subject
            </label>
            <input
              id='subject'
              type='text'
              {...register("subject")}
              className='mt-2 w-full rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 p-3 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500'
            />
            {errors.subject && (
              <p className='text-red-500 text-sm mt-1'>
                {errors.subject.message}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor='message'
              className='block text-sm font-medium text-gray-700 dark:text-gray-300'
            >
              Message
            </label>
            <textarea
              id='message'
              rows={5}
              {...register("message")}
              className='mt-2 w-full rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 p-3 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500'
            ></textarea>
            {errors.message && (
              <p className='text-red-500 text-sm mt-1'>
                {errors.message.message}
              </p>
            )}
          </div>

          <button
            type='submit'
            className='w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-md transition'
            disabled={isSubmitting}
          >
            {isSubmitting ? "Sending..." : "Send Message"}
          </button>
        </form>
      )}
    </div>
  );
};
