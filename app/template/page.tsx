"use client";

import { useState } from "react";
import { createTemplate, upsertTemplate } from "../actions/template";
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
import { SortableItem } from "@/components/SortableItem";
import { Skeleton } from "@/components/ui/skeleton";
import { AnimatePresence, motion } from "framer-motion";

type Field = {
  id: string;
  label: string;
  type: "text" | "date" | "checkbox";
  required: boolean;
};

export default function CreateTemplatePage() {
  const [templateName, setTemplateName] = useState("");
  const [fields, setFields] = useState<Field[]>([]);
  const [isSaving, setIsSaving] = useState(false);
  const [selectedTemplateId, setSelectedTemplateId] = useState<string | null>(
    null
  );
  const [formError, setFormError] = useState<string | null>(null);
  const [formSuccess, setFormSuccess] = useState(false);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 5 },
    })
  );

  const addField = (type: Field["type"]) => {
    const newField: Field = {
      id: crypto.randomUUID(),
      label: "",
      type,
      required: true,
    };
    setFields([...fields, newField]);
  };

  const toggleRequired = (id: string) => {
    setFields((prev) =>
      prev.map((field) =>
        field.id === id ? { ...field, required: !field.required } : field
      )
    );
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

  const autoSave = async (newFields: any[]) => {
    setFields(newFields);
    await upsertTemplate(selectedTemplateId, templateName, newFields);
  };

  const handleSave = async () => {
    setFormError("");
    setFormSuccess(false);

    if (!templateName.trim()) {
      setFormError("Template name is required.");
      setTimeout(() => setFormError(null), 3000);
      return;
    }

    if (fields.length === 0) {
      setFormError("At least one field is required.");
      setTimeout(() => setFormError(null), 3000);
      return;
    }

    if (hasEmptyField) {
      setFormError("All fields must have a label.");
      setTimeout(() => setFormError(null), 3000);
      return;
    }

    try {
      setIsSaving(true);
      const savedTemplate = await upsertTemplate(
        selectedTemplateId,
        templateName,
        fields
      );
      //   await updateUser(user.clerkId, {
      //     publicTemplateId: selectedTemplateId,
      //   });
      if (!selectedTemplateId && savedTemplate?.id) {
        setSelectedTemplateId(savedTemplate.id);
      }
      setFormSuccess(true);
    } catch (err) {
      console.error("Save failed", err);
      setFormError("Something went wrong. Please try again.");
      setTimeout(() => setFormError(null), 3000);
      setIsSaving(false);
    } finally {
      setIsSaving(false);
    }
  };

  const hasEmptyField = fields.some((field) => !field.label.trim());

  return (
    <div className='max-w-3xl mx-auto py-8 space-y-6'>
      {/* Template Name */}
      <div>
        <label className='block text-sm font-medium mb-1'>Template Name</label>
        <input
          type='text'
          value={templateName}
          onChange={(e) => setTemplateName(e.target.value)}
          className='w-full border rounded-md px-3 py-2 text-sm'
          placeholder='e.g., Tattoo Consent Waiver'
        />
      </div>

      {/* Add Fields Section */}
      <div className='space-x-2'>
        <button
          type='button'
          onClick={() => addField("text")}
          className='text-xs bg-gray-100 hover:bg-gray-200 px-3 py-1 rounded-md'
        >
          ➕ Add Text Field
        </button>
        <button
          type='button'
          onClick={() => addField("date")}
          className='text-xs bg-gray-100 hover:bg-gray-200 px-3 py-1 rounded-md'
        >
          📅 Add Date Field
        </button>
        <button
          type='button'
          onClick={() => addField("checkbox")}
          className='text-xs bg-gray-100 hover:bg-gray-200 px-3 py-1 rounded-md'
        >
          ✅ Add Checkbox
        </button>
      </div>

      {/* Field Preview List */}
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={fields.map((f) => String(f.id))}
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
                  transition={{ duration: 0.2 }}
                  className=' space-y-4 py-12'
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
                  transition={{ duration: 0.2 }}
                  className='space-y-4'
                >
                  {fields.map((field, index) => (
                    <SortableItem
                      key={field.id}
                      field={field}
                      index={index}
                      handleLabelChange={(index, value) => {
                        const updated = [...fields];
                        updated[index].label = value;
                        setFields(updated);
                      }}
                      handleRemove={(id) => {
                        setFields(fields.filter((f) => f.id !== id));
                      }}
                      toggleRequired={toggleRequired}
                    />
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </SortableContext>
      </DndContext>

      {/* Auto-Included Fields Notice */}
      <p className='text-xs text-gray-500 italic'>
        ✍️ Signature and legal consent fields (terms, liability waiver) will be
        automatically included.
      </p>

      {/* Save Button */}
      <div>
        <AnimatePresence>
          {formError && (
            <motion.p
              key='form-error'
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className='text-sm text-red-500 mb-2 text-center'
            >
              {formError}
            </motion.p>
          )}
          {formSuccess && (
            <motion.p
              key='form-success'
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className='text-sm text-green-600 mb-2 text-center'
            >
              ✅ Template saved successfully!
            </motion.p>
          )}
        </AnimatePresence>
        <button
          type='button'
          onClick={handleSave}
          disabled={isSaving}
          className='w-full bg-primary hover:bg-primary/90 text-white py-2 rounded-md text-sm disabled:opacity-50'
        >
          {isSaving ? "Saving..." : "Save Template"}
        </button>
      </div>
    </div>
  );
}
