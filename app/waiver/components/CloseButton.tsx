"use client";

export function CloseButton() {
  return (
    <button
      onClick={() => window.close()}
      className='bg-teal-500 hover:bg-teal-600 text-white px-6 py-2 rounded transition'
    >
      Done
    </button>
  );
}
