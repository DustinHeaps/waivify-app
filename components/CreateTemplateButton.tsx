"use client";

import { createTemplate } from "@/app/actions/template";
import { useRouter } from "next/navigation";

export default function CreateTemplateButton() {
  const router = useRouter();

  const handleClick = async () => {
    const template = await createTemplate();
    router.push(`/waiver/${template.id}/edit`);
  };

  return (
    <button onClick={handleClick} className='btn btn-primary'>
      Create New Waiver
    </button>
  );
}
