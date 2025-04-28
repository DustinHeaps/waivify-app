"use client";

import { useEffect, useState } from "react";
import { TemplateSelector } from "@/components/TemplateSelector";
import SimpleWaiverForm from "@/components/SimpleWaiverForm";
import { JsonValue } from "@prisma/client/runtime/library";
import WaiverForm from "./WaiverForm";
import { updateUser } from "@/app/actions/user";
import { TemplatePicker } from "./TemplatePicker";

type Props = {
  isOwner: boolean;
  selectedId: string;
  clerkId: string;
  templates: {
    id: string;
    name: string;
    fields: JsonValue;
  }[];
};

export default function TemplatePageContent({
  templates,
  isOwner,
  selectedId,
  clerkId,
}: Props) {
  const defaultTemplate =
    templates.find((t) => t.id === selectedId) ?? templates[0];

  const [selectedTemplateId, setSelectedTemplateId] = useState(() => {
    return defaultTemplate?.id ?? "";
  });

  const selectedTemplate = templates.find((t) => t.id === selectedTemplateId);

  const handleSelectTemplate = async (id: string) => {
    await updateUser(clerkId, { publicTemplateId: id });
    setSelectedTemplateId(id);
  };

  return (
    <div className='flex flex-col md:flex-row gap-6'>
      <div className='md:w-1/2 space-y-4 md:max-h-[80vh] md:overflow-y-auto pr-2'>
        {isOwner && (
          <div className='mb-4 rounded bg-blue-50 border border-blue-200 text-blue-700 p-3 text-sm text-center'>
            This template will be shown at your public link.
          </div>
        )}

        <TemplatePicker
          templates={templates}
          selectedId={selectedTemplateId}
          onSelect={handleSelectTemplate}
        />
      </div>

      {selectedTemplate && (
        <div className='md:w-1/2'>
          <WaiverForm
            slug=''
            templateId={selectedTemplateId}
            fields={selectedTemplate.fields as any[]}
            isOwner={isOwner}
          />
        </div>
      )}
    </div>
  );
}
