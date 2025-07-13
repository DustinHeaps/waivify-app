
import { AnimatePresence, motion } from "framer-motion";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { SortableItem } from "@/components/SortableItem";

export type Field = {
  id: string;
  label: string;
  type: "text" | "date" | "checkbox";
  required: boolean;
};

type Props = {
  fields: Field[];
  handleDragEnd: (event: any) => void;
  updateLabel: (index: number, value: string) => void;
  removeField: (id: string) => void;
  toggleRequired: (id: string) => void;
};
export default function FieldList({
  fields,
  handleDragEnd,
  updateLabel,
  removeField,
  toggleRequired,
}: Props) {
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } })
  );

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext
        items={fields.map((f: any) => String(f.id))}
        strategy={verticalListSortingStrategy}
      >
        <div className='space-y-4'>
          <AnimatePresence mode='wait'>
            {fields.length === 0 ? (
              <motion.div
                key='empty'
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className='py-12'
              >
                <div className='text-center text-gray-500 py-12 space-y-2'>
                  <p className='text-3xl'>📋</p>
                  <p className='text-sm'>
                    No fields yet. Start by adding a Text, Date, or Checkbox
                    field.
                  </p>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key='fields'
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className='space-y-4'
              >
                {fields.map((field: any, index: number) => (
                  <SortableItem
                    key={field.id}
                    field={field}
                    index={index}
                    handleLabelChange={(i, val) => updateLabel(i, val)}
                    handleRemove={removeField}
                    toggleRequired={toggleRequired}
                  />
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </SortableContext>
    </DndContext>
  );
}
