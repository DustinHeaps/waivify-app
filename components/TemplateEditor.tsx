"use client";

import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { updateTemplate } from "@/app/actions/template";
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { SortableItem } from "./SortableItem";

export default function TemplateEditor({ template }: { template: any }) {
    debugger
  const [name, setName] = useState(template.name);
  const [fields, setFields] = useState<any[]>(template.fields || []);
  const [isSaving, setIsSaving] = useState(false);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 5 },
    })
  );

  const autoSave = async (newFields: any[]) => {
    setFields(newFields);
    await updateTemplate(template.id, name, newFields);
  };

  const handleDragEnd = async (event: any) => {
    const { active, over } = event;
    if (active.id !== over.id) {
      const oldIndex = fields.findIndex((f) => f.id === active.id);
      const newIndex = fields.findIndex((f) => f.id === over.id);
      setFields((prev) => arrayMove(prev, oldIndex, newIndex));
      const reordered = arrayMove(fields, oldIndex, newIndex);
      await autoSave(reordered);
    }
  };

  const addTextField = () =>
    setFields((prev) => [
      ...prev,
      { type: "text", label: "Text Field", id: uuidv4(), required: true },
    ]);

  const addDateField = () =>
    setFields((prev) => [
      ...prev,
      { type: "date", label: "Date", id: uuidv4(), required: true },
    ]);

  const addCheckbox = () =>
    setFields((prev) => [
      ...prev,
      { type: "checkbox", label: "I agree", id: uuidv4(), required: true },
    ]);

  useEffect(() => {
    if (!template?.fields) return;

    const hasFullName = template.fields.some(
      (f: any) => f.label === "Full Name"
    );

    const updatedFields = hasFullName
      ? template.fields
      : [
          {
            id: uuidv4(),
            type: "text",
            label: "Full Name",
            required: true,
            disabled: true,
          },
          ...template.fields,
        ];

    setFields(updatedFields);
  }, [template?.fields]);

  const handleSave = async () => {
    try {
      setIsSaving(true);
      await updateTemplate(template.id, name, fields);
    } catch (err) {
      console.error("Save failed", err);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <>
      <div>
        <label className='block text-sm font-medium mb-1'>Template Name</label>
        <input
          type='text'
          value={name}
          onChange={(e) => setName(e.target.value)}
          className='w-full px-3 py-2 border border-gray-300 rounded shadow-sm focus:outline-none focus:ring focus:ring-teal-200'
        />
      </div>

      <div className='mb-2'>
        <p className='text-sm font-medium mb-1'>{fields.length} field(s)</p>
        <div className='flex flex-wrap gap-2'>
          <button
            onClick={addTextField}
            className='btn border bg-gray-50 text-sm'
          >
            ➕ Add Text Field
          </button>
          <button
            onClick={addDateField}
            className='btn border bg-gray-50 text-sm'
          >
            📅 Add Date Field
          </button>
          <button
            onClick={addCheckbox}
            className='btn border bg-gray-50 text-sm'
          >
            ☑️ Add Checkbox
          </button>
        </div>
      </div>

      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={fields.map((f) => f.id)}
          strategy={verticalListSortingStrategy}
        >
          <div className='space-y-4'>
            {fields.map((field, index) => (
              <SortableItem
                key={field.id}
                field={field}
                index={index}
                handleLabelChange={(i, val) => {
                  const updated = [...fields];
                  updated[i].label = val;
                  setFields(updated);
                }}
                handleRemove={(id) =>
                  setFields(fields.filter((f) => f.id !== id))
                }
              />
            ))}
          </div>
        </SortableContext>
      </DndContext>

      <div className='mt-4'>
        <button
          onClick={handleSave}
          className={`btn bg-black text-white px-4 py-2 rounded hover:bg-gray-700 transition ${
            isSaving ? " cursor-not-allowed" : " hover:bg-gray-700"
          }`}
          disabled={isSaving}
        >
          {isSaving ? "Saving..." : "Save Changes"}
        </button>
        <p className='text-xs text-muted-foreground text-center mt-2'>
          Next: Share your public signing link or preview how this looks for
          clients.
        </p>
      </div>
    </>
  );
}
