"use client";

import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";

export default function WaiverForm({ businessId }: { businessId: string }) {
  const { register, handleSubmit, reset } = useForm();
  const [submitted, setSubmitted] = useState(false);

  const onSubmit = async (data: any) => {
    await fetch("/api/submit-waiver", {
      method: "POST",
      body: JSON.stringify({ ...data, businessId }),
      headers: { "Content-Type": "application/json" },
    });
    setSubmitted(true);
    reset();
  };

  if (submitted)
    return (
      <div className='text-green-600 border p-4 rounded text-sm bg-green-50'>
        ✅ Waiver submitted. Thank you!
      </div>
    );

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
      <div>
        <label className='text-sm font-medium block mb-1'>Full Name</label>
        <Input {...register("name", { required: true })} />
      </div>

      <div>
        <label className='text-sm font-medium block mb-1'>Email</label>
        <Input type='email' {...register("email", { required: true })} />
      </div>

      <div>
        <label className='text-sm font-medium block mb-1'>
          Notes / Questions
        </label>
        <Textarea {...register("notes")} />
      </div>

      <Button type='submit'>Sign Waiver</Button>
    </form>
  );
}
