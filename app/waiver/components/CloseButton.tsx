"use client";

export function CloseButton() {
  return (
    <button
      onClick={() => window.close()}
      className='btn-navy px-6 py-2 rounded'
    >
      Done
    </button>
  );
}
