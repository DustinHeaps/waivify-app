
export default function FieldControls({ addField }: { addField: (type: any) => void }) {
    return (
      <div className='space-x-2'>
        <button onClick={() => addField("text")} className='text-xs bg-gray-100 hover:bg-gray-200 px-3 py-1 rounded-md'>
          ➕ Add Text Field
        </button>
        <button onClick={() => addField("date")} className='text-xs bg-gray-100 hover:bg-gray-200 px-3 py-1 rounded-md'>
          📅 Add Date Field
        </button>
        <button onClick={() => addField("checkbox")} className='text-xs bg-gray-100 hover:bg-gray-200 px-3 py-1 rounded-md'>
          ✅ Add Checkbox
        </button>
      </div>
    );
  }
  