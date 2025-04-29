import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";
import { useEffect, useState } from "react";

export function SortableItem({
  field,
  index,
  handleLabelChange,
  handleRemove,
}: {
  field: any;
  index: number;
  handleLabelChange: (index: number, value: string) => void;
  handleRemove: (id: string) => void;
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
          
          <input
            type='text'
            value={field.label}
            placeholder={`Enter Label...`}
            onChange={(e) => handleLabelChange(index, e.target.value)}
            className={`w-full text-sm px-3 py-1.5 border rounded ${
              field.label === "Full Name"
                ? "cursor-not-allowed pointer-events-none bg-gray-100 text-gray-500"
                : ""
            }`}
          />

          <span className=' pl-4 text-xs font-semibold text-gray-500 capitalize'>
            {field.type}
          </span>
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
