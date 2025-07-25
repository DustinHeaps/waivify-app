
"use client";

import { Clerk404Provider } from './Clerk404Context';



export default function NotFoundClientWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return <Clerk404Provider>{children}</Clerk404Provider>;
}
