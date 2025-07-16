import { updateUser } from "@/app/actions/user";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Template } from '@prisma/client';

type Props = {
  templates: any[];
  selectedTemplateId: string | null;
  setSelectedTemplateId: (id: string | null) => void;
  setTemplateName: (name: string) => void;
  calendlyUrl: string | null;
  setCalendlyUrl: (url: string) => void;
  plan: string;
  setFields: (fields: any[]) => void;
  templateName: string;
  setTemplateNameHandler: (name: string) => void;
  setIsDefaultTemplate: (flag: boolean) => void;
  isDefaultTemplate: boolean;
  clerkId: string;
  customUserTemplates: Template[]
};

export default function TemplateHeader({
  templates,
  selectedTemplateId,
  setSelectedTemplateId,
  setTemplateName,
  calendlyUrl,
  setCalendlyUrl,
  plan,
  setFields,
  templateName,
  setTemplateNameHandler,
  isDefaultTemplate,
  setIsDefaultTemplate,
  clerkId,
  customUserTemplates
  
}: Props) {
  return (
    <div className='space-y-2 mb-6'>
      <h2 className='text-lg font-semibold text-gray-900'>Manage Templates</h2>
      <div className='flex items-center justify-between'>
        {customUserTemplates.length < 5 ? (
          <button
            type='button'
            onClick={() => {
              setSelectedTemplateId(null);
              setTemplateName("");
              setFields([]);
            }}
            className='text-sm bg-gray-100 hover:bg-gray-200 px-3 py-1 rounded-md'
          >
            ➕ New Template
          </button>
        ) : (
          <span className='text-xs text-gray-500'>
            You've reached the limit of 5 custom templates.
          </span>
        )}
      </div>
      {plan !== 'free' && (
        <div className='mt-2'>
          <label className='block text-sm font-medium mb-1'>
            Select Template
          </label>
          <Select
            value={selectedTemplateId || ""}
            onValueChange={async (id) => {
              const selected = templates.find((t: any) => t.id === id);
              if (selected) {
                setSelectedTemplateId(id);
                setTemplateName(selected.name);
                setFields(selected.fields);
                setIsDefaultTemplate(!!selected.isDefault);
                setCalendlyUrl(selected.calendlyUrl || "");

                try {
                  await updateUser(clerkId as string, {
                    publicTemplateId: id,
                  });
                } catch (err) {
                  console.error("Failed to update publicTemplateId", err);
                }
              }
            }}
          >
            <SelectTrigger className='w-full'>
              <SelectValue placeholder='Select Template' />
            </SelectTrigger>
            <SelectContent>
              {templates.map((t: any) => (
                <SelectItem key={t.id} value={t.id}>
                  {t.name || "Untitled Template"}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )}
      <label className='block text-sm font-medium mb-1'>Template Name</label>
      <input
        type='text'
        value={templateName}
        onChange={(e) => setTemplateNameHandler(e.target.value)}
        className='w-full border rounded-md px-3 py-2 text-sm'
        placeholder='e.g., Tattoo Consent Waiver'
        disabled={isDefaultTemplate}
      />
      {plan !== "pro" && (
        <>
          <label className='block text-sm font-medium text-gray-700 mb-1'>
            Calendly Scheduling Link{" "}
            <span className='text-red-500'>(Pro only)</span>
          </label>
          <input
            type='text'
            disabled
            placeholder='Upgrade to Pro to use this feature'
            className='w-full px-3 py-2 border rounded-md shadow-sm bg-gray-100 text-gray-400 cursor-not-allowed'
          />
        </>
      )}
      {plan === "pro" && (
        <>
          <label className='block text-sm font-medium mb-1'>
            Calendly Scheduling Link (optional)
          </label>
          <input
            type='url'
            value={calendlyUrl as string}
            onChange={(e) => setCalendlyUrl(e.target.value)}
            className='w-full border rounded-md px-3 py-2 text-sm'
            placeholder='https://calendly.com/yourname/session'
          />
          {isDefaultTemplate && (
            <p className='text-xs text-yellow-600 mt-1'>
              Only the Calendly link can be edited for default templates.
            </p>
          )}
        </>
      )}
    </div>
  );
}
