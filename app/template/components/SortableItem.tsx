import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "../../../components/ui/tooltip";
import { useEffect, useState } from "react";
import { Field } from "@/app/template/components/FieldList";
import { GripVertical } from 'lucide-react';

export function SortableItem({
  field,
  index,
  handleLabelChange,
  handleRemove,
  toggleRequired,
  recommendedFields,
  isDefaultTemplate,
}: {
  field: any;
  index: number;
  handleLabelChange: (index: number, value: string) => void;
  handleRemove: (id: string) => void;
  toggleRequired: (id: string) => void;
  recommendedFields: Field[];
  isDefaultTemplate: boolean;
}) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: field.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  if (!isMounted) return null;

  const isRecommended = recommendedFields.some(
    (r) => r.label.toLowerCase() === field.label.toLowerCase()
  );
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <div
          ref={setNodeRef}
          style={style}
          {...attributes}
          {...listeners}
          className='w-full bg-white p-4 rounded border shadow-sm flex items-center justify-between'
        >
          <div {...attributes} {...listeners} className='cursor-grab'>
            <GripVertical className='w-4 h-4 text-gray-400' />
          </div>
          <input
            type='text'
            value={field.label}
            placeholder={`Enter Label...`}
            onChange={(e) => handleLabelChange(index, e.target.value)}
            className={`w-full text-sm px-3 py-1.5 border rounded`}
            readOnly={isRecommended || isDefaultTemplate}
          />

          <span className=' px-4 text-xs font-semibold text-gray-500 capitalize'>
            {field.type}
          </span>
          <button
            type='button'
            onClick={() => toggleRequired(field.id)}
            className={`text-xs px-2 py-1 rounded border transition-colors duration-200 ${
              field.required
                ? "bg-green-100 text-green-700 border-green-300"
                : "bg-gray-100 text-gray-500 border-gray-300"
            }`}
          >
            {field.required ? "Required" : "Optional"}
          </button>

          {field.label !== "Full Name" && (
            <button
              className='ml-4 text-sm text-red-600 hover:underline'
              onClick={() => handleRemove(field.id)}
            >
              Remove
            </button>
          )}
        </div>
      </TooltipTrigger>
      <TooltipContent>Drag to reorder</TooltipContent>
    </Tooltip>
  );
}
