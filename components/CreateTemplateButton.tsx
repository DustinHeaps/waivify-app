"use client";

import { getUserById } from "@/app/actions/user";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function CreateTemplateButton() {
  const [id, setId] = useState("");

  useEffect(() => {
    const fetchUser = async () => {
      const result = await getUserById();
      setId(result?.publicTemplateId as string);
    };

    fetchUser();
  }, []);

  return (
    <Link
      href={"/waiver/edit"}
      className='btn btn-primary px-4 py-2 bg-teal-500 rounded text-white text-sm hover:opacity-90 transition'
    >
      {id ? "Edit Template" : "Create Template"}
    </Link>
  );
}
