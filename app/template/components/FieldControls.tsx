import { Field } from "./FieldList";

export default function FieldControls({
  addField,
  isDefaultTemplate,
  recommendedFields,
  fields,
}: {
  addField: (field: Field) => void;
  isDefaultTemplate: boolean;
  recommendedFields: {
    label: string;
    type: "text" | "date" | "checkbox";
    required: boolean;
  }[];
  fields: { label: string }[];
}) {
  return (
    <div className='space-x-2'>
      {!isDefaultTemplate && (
        <div className='mt-4 space-y-2'>
          <p className='text-sm font-medium text-gray-700'>
            Recommended Fields (Click to Add)
          </p>
          <div className='flex flex-wrap gap-2'>
            {recommendedFields.map((field) => {
              const alreadyExists = fields.some(
                (f) => f.label.toLowerCase() === field.label.toLowerCase()
              );

              return (
                <button
                  key={field.label}
                  disabled={alreadyExists}
                  onClick={() =>
                    addField({
                      type: field.type,
                      label: field.label,
                      required: field.required,
                      id: crypto.randomUUID(),
                    })
                  }
                  className={`text-xs px-3 py-1 rounded-md ${
                    alreadyExists
                      ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                      : "bg-gray-100 hover:bg-gray-200"
                  }`}
                >
                  ➕ {field.label}
                </button>
              );
            })}
          </div>
        </div>
      )}
      <div className='space-y-2'>
        <button
          disabled={isDefaultTemplate}
          onClick={() =>
            addField({
              id: crypto.randomUUID(),
              label: "",
              type: "text",
              required: false,
            })
          }
          className='-ml-2 text-xs bg-gray-100 hover:bg-gray-200 px-3 py-1 rounded-md'
        >
          ➕ Add Text Field
        </button>
        <button
          disabled={isDefaultTemplate}
          onClick={() =>
            addField({
              id: crypto.randomUUID(),
              label: "",
              type: "date",
              required: false,
            })
          }
          className='text-xs bg-gray-100 hover:bg-gray-200 px-3 py-1 rounded-md'
        >
          📅 Add Date Field
        </button>
        <button
          disabled={isDefaultTemplate}
          onClick={() =>
            addField({
              id: crypto.randomUUID(),
              label: "",
              type: "checkbox",
              required: false,
            })
          }
          className='text-xs bg-gray-100 hover:bg-gray-200 px-3 py-1 rounded-md'
        >
          ✅ Add Checkbox
        </button>
      </div>
    </div>
  );
}
