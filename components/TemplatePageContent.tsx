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
  plan: string;
};

export default function TemplatePageContent({
  templates,
  isOwner,
  selectedId,
  clerkId,
  plan,
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
          <div className='mb-4 rounded-md border border-blue-200 bg-blue-50 px-4 py-3 text-sm text-blue-700 text-center'>
            📄{" "}
            <span className='font-medium'>
              This is your active public template.
            </span>{" "}
            Clients will see this at your shareable link.
          </div>
        )}
        <div className='mb-6 space-y-1'>
          <h2 className='text-lg font-semibold text-gray-900'>
            Choose a Template
          </h2>
          <p className='text-sm text-muted-foreground'>
            Pick a waiver template to use as your starting point. You can
            customize it after selection.
          </p>

          {plan === "starter" && (
            <p className='text-sm text-muted-foreground italic'>
              Your plan includes 1 custom template. Upgrade to Pro for more.
            </p>
          )}
          {plan === "pro" && (
            <p className='text-xs text-muted-foreground mt-1 italic'>
              You can create up to 5 custom templates with your Pro plan.
            </p>
          )}
        </div>

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
