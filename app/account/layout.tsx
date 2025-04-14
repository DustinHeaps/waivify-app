import Link from "next/link";
import Image from "next/image";
import { ReactNode } from "react";
import { Logo } from "@/components/Logo";

export default function AccountLayout({ children }: { children: ReactNode }) {
    return (
        <div className='p-4'>
          <header className='flex justify-between items-center mb-4'>
            <Logo />
          </header>
          <main>{children}</main>
        </div>
      );
}
