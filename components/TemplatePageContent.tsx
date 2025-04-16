"use client";

import { useState } from "react";
import { TemplateSelector } from "@/components/TemplateSelector";
import SimpleWaiverForm from "@/components/SimpleWaiverForm";
import { JsonValue } from "@prisma/client/runtime/library";
import WaiverForm from "./WaiverForm";
import { updateUser } from "@/app/actions/user";

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

  return (
    <div className='flex flex-col gap-6'>
      {isOwner && (
        <div className='mb-4 rounded bg-blue-50 border border-blue-200 text-blue-700 p-3 text-sm text-center'>
          This template will be shown at your public link.
        </div>
      )}
      <TemplateSelector
        templates={templates.map((t) => ({
          ...t,
          fields: (t.fields ?? []) as any[],
        }))}
        selectedId={selectedTemplateId}
        onChange={async (id) => {
          await updateUser(clerkId, {
            publicTemplateId: id,
          });
          setSelectedTemplateId(id);
        }}
      />

      {selectedTemplate && (
        <WaiverForm
          slug=''
          templateId={selectedTemplateId}
          fields={selectedTemplate.fields as any[]}
          isOwner={isOwner}
        />
      )}
    </div>
  );
}
