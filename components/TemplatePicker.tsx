"use client";

import { useMediaQuery } from 'usehooks-ts';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';

type Template = {
  id: string;
  name: string;
  description?: string;
};

export function TemplatePicker({
  templates,
  selectedId,
  onSelect,
}: {
  templates: Template[];
  selectedId: string;
  onSelect: (id: string) => void;
}) {
  const isMobile = useMediaQuery("(max-width: 767px)");

  if (isMobile) {
    // Use shadcn Select for mobile
    return (
      <Select value={selectedId} onValueChange={onSelect}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Select a Template" />
        </SelectTrigger>
        <SelectContent>
          {templates.map((template) => (
            <SelectItem key={template.id} value={template.id}>
              {template.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    );
  }

  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
      {templates.map((template) => (
        <button
          key={template.id}
          onClick={() => onSelect(template.id)}
          className={`text-left p-4 rounded-lg border transition shadow-sm hover:shadow-md focus:outline-none ${
            selectedId === template.id
              ? "border-primary ring-2 ring-primary"
              : "border-gray-200 hover:border-gray-300"
          }`}
        >
          <div className='font-semibold text-gray-900'>{template.name}</div>
          {template.description && (
            <div className='text-sm text-gray-500 mt-1'>
              {template.description}
            </div>
          )}
          {selectedId === template.id && (
            <div className='mt-2 text-xs font-semibold text-primary'>
              <span className='mt-2 inline-block rounded-full bg-blue-100 text-blue-700 px-2 py-0.5 text-xs font-semibold'>
                Selected
              </span>
            </div>
          )}
        </button>
      ))}
    </div>
  );
}
