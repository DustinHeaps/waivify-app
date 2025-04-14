"use client";

import { updateTemplate } from "@/app/actions/template";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

export default function TemplateEditor({ template }: { template: any }) {
    debugger
  const [name, setName] = useState(template.name);
  const [fields, setFields] = useState<any[]>(template.fields || []);
  const [fullNameAdded, setFullNameAdded] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const addTextField = () => {
    setFields([
      ...fields,
      { type: "text", label: "Text Field", id: uuidv4(), required: true },
    ]);
  };

  const addDateField = () => {
    setFields([
      ...fields,
      { type: "date", label: "Date", id: uuidv4(), required: true },
    ]);
  };

  const addCheckbox = () => {
    setFields([
      ...fields,
      { type: "checkbox", label: "I agree", id: uuidv4(), required: true },
    ]);
  };

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
    setFullNameAdded(true);
  }, [template?.fields]);

  const handleSave = async () => {
    // setFields([
    //     ...fields,
    //     { type: "checkbox", label: "I agree to the terms & conditions", id: uuidv4(), required: true },
    //   ]);
    //   setFields([
    //     ...fields,
    //     { type: "checkbox", label: "I release liability for this service", id: uuidv4(), required: true },
    //   ]);
    try {
      setIsSaving(true);
      await updateTemplate(template.id, name, fields);
    } catch (err) {
      setIsSaving(false);
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

      <div>
        <p className='text-sm mb-2 font-medium'>{fields.length} field(s)</p>
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

      <div className='space-y-4'>
        {fields.map((field, index) => (
          <div
            key={field.id}
            className='bg-white p-4 rounded border shadow-sm flex items-center justify-between'
          >
            <input
              type='text'
              value={field.label}
              onChange={(e) => {
                const updated = [...fields];
                updated[index].label = e.target.value;
                setFields(updated);
              }}
              className={`w-full text-sm px-3 py-1.5 border rounded ${
                field.label === "Full Name"
                  ? "cursor-not-allowed pointer-events-none bg-gray-100 text-gray-500"
                  : ""
              }`}
            />

            {field.label !== "Full Name" && (
              <button
                className='ml-4 text-sm text-red-600 hover:underline'
                onClick={() => {
                  setFields(fields.filter((f) => f.id !== field.id));
                }}
              >
                Remove
              </button>
            )}
          </div>
        ))}
      </div>

      <div>
        <button
          onClick={handleSave}
          className={`btn bg-black text-white px-4 py-2 rounded hover:bg-gray-700 transition ${
            isSaving ? " cursor-not-allowed" : " hover:bg-gray-700"
          }`}
          disabled={isSaving}
        >
          {isSaving ? "Saving..." : "Save Changes"}
        </button>
      </div>
    </>
  );
}
