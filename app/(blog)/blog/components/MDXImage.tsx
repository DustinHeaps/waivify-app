"use client";

import Image from "next/image";

export default function MdxImage(props: any) {
  return (
    <Image
      {...props}
      alt={props.alt || ""}
      width={props.width || 800}
      height={props.height || 400}
    />
  );
}
