type TemplateSelectorProps = {
  templates: { id: string; name: string; fields: any[] }[];
  selectedId: string;
  onChange: (id: string) => void;
};

export function TemplateSelector({
  templates,
  selectedId,
  onChange,
}: TemplateSelectorProps) {
  return (
    <div>
      <label className='text-sm font-medium'>Choose a Template</label>
      <select
        className='w-[83%] border p-2 rounded'
        value={selectedId}
        onChange={(e) => {
          onChange(e.target.value);
        }}
      >
        {templates.map((template) => (
          <option key={template.id} value={template.id}>
            {template.name}
          </option>
        ))}
      </select>
    </div>
  );
}
