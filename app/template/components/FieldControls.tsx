export default function FieldControls({
  addField,
  isDefaultTemplate,
}: {
  addField: (type: any) => void;
  isDefaultTemplate: boolean;
}) {
  return (
    <div className='space-x-2'>
      <button
        disabled={isDefaultTemplate}
        onClick={() => addField("text")}
        className='text-xs bg-gray-100 hover:bg-gray-200 px-3 py-1 rounded-md'
      >
        ➕ Add Text Field
      </button>
      <button
        disabled={isDefaultTemplate}
        onClick={() => addField("date")}
        className='text-xs bg-gray-100 hover:bg-gray-200 px-3 py-1 rounded-md'
      >
        📅 Add Date Field
      </button>
      <button
        disabled={isDefaultTemplate}
        onClick={() => addField("checkbox")}
        className='text-xs bg-gray-100 hover:bg-gray-200 px-3 py-1 rounded-md'
      >
        ✅ Add Checkbox
      </button>
    </div>
  );
}
