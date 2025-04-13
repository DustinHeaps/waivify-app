"use client";

import { updateTemplate } from "@/app/actions/template";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

export default function TemplateEditor({ template }: { template: any }) {
  const [name, setName] = useState(template.name);
  const [fields, setFields] = useState<any[]>(template.fields || []);
  const [fullNameAdded, setFullNameAdded] = useState(false);

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
    await updateTemplate(template.id, name, fields);
  };

  return (
    <div className='space-y-4'>
      <label className='block'>
        <span className='text-sm font-medium'>Template Name</span>
        <input
          type='text'
          value={name}
          onChange={(e) => setName(e.target.value)}
          className='w-full p-2 border rounded'
        />
      </label>

      <div className='text-sm text-muted-foreground'>
        {fields.length === 0 ? "No fields yet." : `${fields.length} field(s)`}
        <div className='space-x-2 mt-4'>
          <button
            className='px-3 py-1 bg-gray-100 rounded'
            onClick={addTextField}
          >
            Add Text Field
          </button>
          <button
            className='px-3 py-1 bg-gray-100 rounded'
            onClick={addDateField}
          >
            Add Date Field
          </button>
          <button
            className='px-3 py-1 bg-gray-100 rounded'
            onClick={addCheckbox}
          >
            Add Checkbox
          </button>
          <div className='space-y-4 mt-6'>
            {fields.map((field, index) => (
              <div key={field.id} className='flex items-center justify-between'>
                <div>
                  <input
                    type='text'
                    value={field.label}
                    onChange={(e) => {
                      const updated = [...fields];
                      updated[index].label = e.target.value;
                      setFields(updated);
                    }}
                    className={`mt-2 border px-2 py-1 rounded w-full text-sm ${
                      field.label === "Full Name"
                        ? "cursor-not-allowed pointer-events-none"
                        : ""
                    }`}
                    placeholder='Field Label'
                  />
                </div>

                {field.label !== "Full Name" && (
                  <button
                    className='text-red-500 text-sm'
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
        </div>
      </div>

      <button onClick={handleSave} className='btn btn-primary'>
        Save Changes
      </button>
    </div>
  );
}
