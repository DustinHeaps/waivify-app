import { endOfWeek } from 'date-fns';
"use server";

import { db } from "@/lib/prisma";
import { utapi } from "../api/uploadthing/core";
import { trackEvent } from '@/lib/posthog/posthog.server';
// import { revalidatePath } from 'next/cache';

export async function uploadSignature(formData: FormData, waiverId: string, date: Date) {
  const files = formData.getAll("file") as File[];

  if (!files || files.length === 0) {
    throw new Error("No file found in formData");
  }

  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  // const date = `${formData.get("date")}T00:00:00Z`;

  const uploaded = await utapi.uploadFiles(files);

  const file = uploaded[0]?.data;

  if (!file || !file.url) {
    throw new Error("Upload failed or missing file URL");
  }

  const saved = await db.signature.create({
    data: {
      name,
      email,
      date,
      fileKey: file.key,
      waiver: {
        connect: { id: waiverId },
      },
    },
  });

  // revalidatePath("/admin");
  await trackEvent({
    event: "signature_saved",
    distinctId: file.key,
  });
  return saved;
}

export async function getSignatureById(id: string) {
  const signature = await db.signature.findUnique({
    where: { id },
  });

  return signature;
}
