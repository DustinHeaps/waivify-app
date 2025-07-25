import { ReactNode } from "react";
import { Logo } from "@/components/Logo";
import { usePathname } from "next/navigation";

export default function WaiverLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  const isConfirmation = pathname?.startsWith("/waiver/confirmation");
  return (
    <div className='p-4'>
      <header className='flex justify-between items-center mb-4'>
        {!isConfirmation && <Logo />}
      </header>
      <main>{children}</main>
    </div>
  );
}
