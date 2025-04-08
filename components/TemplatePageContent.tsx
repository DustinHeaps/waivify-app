"use client";

import { useState } from "react";
import { TemplateSelector } from "@/components/TemplateSelector";
import SimpleWaiverForm from "@/components/SimpleWaiverForm";
import { JsonValue } from "@prisma/client/runtime/library";
import WaiverForm from './WaiverForm';


type Props = {
  templates: {
    id: string;
    name: string;
    fields: JsonValue;
  }[];
};

export default function TemplatePageContent({ templates }: Props) {
  const defaultTemplate =
    templates.find((t) => t.name === "Basic Waiver") ?? templates[0];

  const [selectedTemplateId, setSelectedTemplateId] = useState(() => {
    return defaultTemplate?.id ?? ""; // fallback to empty string if undefined
  });
  const selectedTemplate = templates.find((t) => t.id === selectedTemplateId);

  return (
    <div className='flex flex-col gap-6'>
      <TemplateSelector
        templates={templates.map((t) => ({
          ...t,
          fields: (t.fields ?? []) as any[],
        }))}
        selectedId={selectedTemplateId}
        onChange={(id) => {
          console.log("Selected ID:", id);
          setSelectedTemplateId(id);
        }}
      />
      {/* <SimpleWaiverForm slug='' fields={selectedTemplate.fields} /> */}
      {selectedTemplate && (
        <WaiverForm slug='' templateId={selectedTemplateId}  fields={selectedTemplate.fields as any[]} />
      )}
    </div>
  );
}
