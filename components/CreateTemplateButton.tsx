"use client";

import Link from "next/link";

export default function CreateTemplateButton() {
  return (
    <Link
      href={"/waiver/edit"}
      className='btn btn-primary px-4 py-2 bg-teal-500 rounded text-white text-sm hover:opacity-90 transition'
    >
      Edit Template
    </Link>
  );
}
