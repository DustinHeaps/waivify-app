"use client";

import { useEffect, useState } from "react";
import {
  getAllUserTemplates,
  upsertTemplate,
  upsertUserTemplateSettings,
} from "../actions/template";

import { arrayMove } from "@dnd-kit/sortable";

import { getUserById, updateUser } from "../actions/user";
import { Template, User } from "@prisma/client";
import PlanGuard from "@/components/PlanGuard";

import TemplateHeader from "./components/TemplateHeader";
import FieldControls from "./components/FieldControls";
import FieldList from "./components/FieldList";
import SaveBar from "./components/SaveBar";

type Field = {
  id: string;
  label: string;
  type: "text" | "date" | "checkbox" | "email";
  required: boolean;
};

const recommendedFields: {
  label: string;
  type: Field["type"];
  required: boolean;
  id: string;
}[] = [
  { id: "full-name", label: "Full Name", type: "text", required: true },
  // {id: "email", label: "Email", type: "email", required: true },
  { id: "phone-number", label: "Phone Number", type: "text", required: true },
  { id: "medical", label: "Medical Conditions", type: "text", required: false },
  {
    id: "emee=rgency-name",
    label: "Emergency Contact Name",
    type: "text",
    required: true,
  },
  {
    id: "emergency-phone",
    label: "Emergency Contact Phone",
    type: "text",
    required: true,
  },
];

export default function CreateTemplatePage() {
  const [templates, setTemplates] = useState<any[]>([]);
  const [templateName, setTemplateName] = useState("");
  const [fields, setFields] = useState<Field[]>([]);
  const [isSaving, setIsSaving] = useState(false);
  const [isDefaultTemplate, setIsDefaultTemplate] = useState(false);
  const [selectedTemplateId, setSelectedTemplateId] = useState<string | null>(
    null
  );
  const [formError, setFormError] = useState<string | null>(null);
  const [formSuccess, setFormSuccess] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [originalCalendlyUrl, setOriginalCalendlyUrl] = useState<string | null>(
    null
  );
  const [calendlyUrl, setCalendlyUrl] = useState<string>("");
  const [customUserTemplates, setCustomUserTemplates] = useState<Template[]>(
    []
  );

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const user = await getUserById();
        setUser(user);

        const userTemplates = await getAllUserTemplates(user?.id as string);

        let customUserTemplates: Template[] = [];

        userTemplates.forEach((template) => {
          if (!template?.isDefault) {
            customUserTemplates.push(template!);
          }
        });
        setCustomUserTemplates(customUserTemplates);
        setTemplates(userTemplates || []);

        if (user?.publicTemplateId) {
          setSelectedTemplateId(user.publicTemplateId);
          const current = userTemplates.find(
            (t) => t?.id === user.publicTemplateId
          );
          if (current) {
            setTemplateName(current.name);
            setFields(current.fields as Field[]);
            setIsDefaultTemplate(false);

            // 🔁 Pull override from UserTemplateSettings if available
            // const overrideUrl = current.calendlyUrl;

            setCalendlyUrl(current.calendlyUrl || "");
            setOriginalCalendlyUrl(current.calendlyUrl || "");
          } else {
            setIsDefaultTemplate(true);
          }
        }
      } catch (err) {
        console.error("Failed to fetch user", err);
      }
    };

    fetchUser();
  }, []);

  const addField = (field: Field) => {
    setFields((prev) => [...prev, field]);
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
    await upsertTemplate(
      selectedTemplateId,
      templateName,
      newFields,
      calendlyUrl,
      user?.id as string,
      user?.clerkId as string
    );
  };

  const handleSave = async () => {
    setFormError("");
    setFormSuccess(false);

    if (isDefaultTemplate) {
      try {
        setIsSaving(true);
        // Clone the default template
        const savedTemplate = await upsertTemplate(
          selectedTemplateId,
          templateName,
          fields,
          calendlyUrl,
          user?.id as string,
          user?.clerkId as string
        );

        // const settings = await upsertUserTemplateSettings(
        //   savedTemplate?.id as string,
        //   calendlyUrl,
        //   user?.clerkId as string
        // );

        setFormSuccess(true);
      } catch (err) {
        console.error("Calendly save failed", err);
        setFormError("Something went wrong. Please try again.");
      } finally {
        setIsSaving(false);
      }
      return;
    }

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
        fields,
        calendlyUrl,
        user?.id as string,
        user?.clerkId as string
      );

      await updateUser(user?.clerkId as string, {
        publicTemplateId: savedTemplate?.id,
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
  const calendlyUrlChanged = calendlyUrl !== (originalCalendlyUrl || "");

  return (
    <PlanGuard allowedPlans={["starter", "pro"]}>
      <div className='max-w-3xl mx-auto py-8 space-y-6'>
        <TemplateHeader
          templates={templates}
          selectedTemplateId={selectedTemplateId}
          setSelectedTemplateId={setSelectedTemplateId}
          setTemplateName={setTemplateName}
          calendlyUrl={calendlyUrl}
          setCalendlyUrl={setCalendlyUrl}
          plan={user?.plan as string}
          setFields={setFields}
          templateName={templateName}
          setTemplateNameHandler={setTemplateName}
          setIsDefaultTemplate={setIsDefaultTemplate}
          isDefaultTemplate={isDefaultTemplate}
          clerkId={user?.clerkId as string}
          customUserTemplates={customUserTemplates}
        />
        {isDefaultTemplate && (
          <div className='bg-blue-50 border border-blue-200 text-blue-800 text-sm rounded px-4 py-3 mb-4'>
            This is a default template and cannot be edited. To make changes,
            select or create a custom template.
          </div>
        )}
        <FieldControls
          recommendedFields={recommendedFields}
          isDefaultTemplate={isDefaultTemplate}
          addField={addField}
          fields={fields}
        />

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
          recommendedFields={recommendedFields}
          isDefaultTemplate={isDefaultTemplate}
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
          isDefaultTemplate={isDefaultTemplate}
          canSave={isDefaultTemplate ? calendlyUrlChanged : true}
        />
      </div>
    </PlanGuard>
  );
}
