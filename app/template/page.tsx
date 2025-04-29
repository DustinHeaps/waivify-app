"use client";

import { useEffect, useState } from "react";
import { upsertTemplate } from "../actions/template";

import { arrayMove } from "@dnd-kit/sortable";

import { getUserById, updateUser } from "../actions/user";
import { User } from "@prisma/client";
import PlanGuard from "@/components/PlanGuard";

import TemplateHeader from "./components/TemplateHeader";
import FieldControls from "./components/FieldControls";
import FieldList from "./components/FieldList";
import SaveBar from "./components/SaveBar";

type Field = {
  id: string;
  label: string;
  type: "text" | "date" | "checkbox";
  required: boolean;
};

export default function CreateTemplatePage() {
  const [templates, setTemplates] = useState<any[]>([]);
  const [templateName, setTemplateName] = useState("");
  const [fields, setFields] = useState<Field[]>([]);
  const [isSaving, setIsSaving] = useState(false);
  const [selectedTemplateId, setSelectedTemplateId] = useState<string | null>(
    null
  );
  const [formError, setFormError] = useState<string | null>(null);
  const [formSuccess, setFormSuccess] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const result = await getUserById();
        setUser(result);
        setTemplates(result?.Template || []);

        if (result?.publicTemplateId) {
          setSelectedTemplateId(result.publicTemplateId);
          const current = result.Template.find(
            (t) => t.id === result.publicTemplateId
          );
          if (current) {
            setTemplateName(current.name);
            setFields(current.fields as Field[]);
          }
        }
      } catch (err) {
        console.error("Failed to fetch user", err);
      }
    };

    fetchUser();
  }, []);

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

      await updateUser(user?.clerkId as string, {
        publicTemplateId: savedTemplate.id,
      });
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
    <PlanGuard allowedPlans={["starter", "pro"]}>
      <div className='max-w-3xl mx-auto py-8 space-y-6'>
        <TemplateHeader
          templates={templates}
          selectedTemplateId={selectedTemplateId}
          setSelectedTemplateId={setSelectedTemplateId}
          setTemplateName={setTemplateName}
          setFields={setFields}
          templateName={templateName}
          setTemplateNameHandler={setTemplateName}
        />

        <FieldControls addField={addField} />

        <FieldList
          fields={fields}
          handleDragEnd={handleDragEnd}
          updateLabel={(index: number, value: string) => {
            const updated = [...fields];
            updated[index].label = value;
            setFields(updated);
          }}
          removeField={(id: string) =>
            setFields(fields.filter((f) => f.id !== id))
          }
          toggleRequired={toggleRequired}
        />

        <p className='text-xs text-gray-500 italic'>
          ✍️ Signature and legal consent fields (terms, liability waiver) will
          be automatically included.
        </p>

        <SaveBar
          formError={formError}
          formSuccess={formSuccess}
          handleSave={handleSave}
          isSaving={isSaving}
        />
      </div>
    </PlanGuard>
  );
}
