import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type Props = {
  templates: any[];
  selectedTemplateId: string | null;
  setSelectedTemplateId: (id: string | null) => void;
  setTemplateName: (name: string) => void;
  setFields: (fields: any[]) => void;
  templateName: string;
  setTemplateNameHandler: (name: string) => void;
  setIsDefaultTemplate: (flag: boolean) => void;
  isDefaultTemplate: boolean
};

export default function TemplateHeader({
  templates,
  selectedTemplateId,
  setSelectedTemplateId,
  setTemplateName,
  setFields,
  templateName,
  setTemplateNameHandler,
  isDefaultTemplate,
  setIsDefaultTemplate
}: Props) {
  return (
    <div className='space-y-2 mb-6'>
      <h2 className='text-lg font-semibold text-gray-900'>Manage Templates</h2>
      <div className='flex items-center justify-between'>
        {templates.length > 5 ? (
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
      {templates.length > 0 && (
        <div className='mt-2'>
          <label className='block text-sm font-medium mb-1'>
            Select Template
          </label>
          <Select
            value={selectedTemplateId || ""}
            onValueChange={(id) => {
              const selected = templates.find((t: any) => t.id === id);
              if (selected) {
                setSelectedTemplateId(id);
                setTemplateName(selected.name);
                setFields(selected.fields);
                setIsDefaultTemplate(!!selected.isDefault);
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
    </div>
  );
}
