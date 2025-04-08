"use client";

import { createTemplate } from "@/app/actions/template";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function NewTemplatePage() {
  const [fields, setFields] = useState<any[]>([]);
  const [templateName, setTemplateName] = useState("");

  const addField = (type: string) => {
    setFields((prev) => [...prev, { label: "", type, required: true }]);
  };

  const handleSave = async () => {
    try {
      await createTemplate({ name: "New Waiver", fields });
    } catch (err) {
      console.error("Failed to create template", err);

    }
  };

  return (
    <div className='space-y-6 max-w-xl mx-auto p-6'>
      <h1 className='text-xl font-semibold'>Create Template</h1>

      <input
        placeholder='Template name'
        className='border p-2 w-full'
        value={templateName}
        onChange={(e) => setTemplateName(e.target.value)}
      />

      <div className='space-y-3'>
        {fields.map((field, idx) => (
          <div key={idx} className='border rounded p-3 space-y-1'>
            <input
              value={field.label}
              onChange={(e) => {
                const updated = [...fields];
                updated[idx].label = e.target.value;
                setFields(updated);
              }}
              placeholder='Field label'
              className='w-full border p-1'
            />
            <p className='text-sm text-muted-foreground'>Type: {field.type}</p>
          </div>
        ))}
      </div>

      <div className='flex gap-2'>
        <Button onClick={() => addField("text")}>+ Text</Button>
        <Button onClick={() => addField("date")}>+ Date</Button>
        <Button onClick={() => addField("checkbox")}>+ Checkbox</Button>
      </div>

      <Button onClick={handleSave} className='bg-teal-600 text-white mt-4'>
        Save Template
      </Button>
    </div>
  );
}
