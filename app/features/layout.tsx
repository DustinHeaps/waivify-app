import { Logo } from "@/components/Logo";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className='p-4'>
      <header className='flex justify-between items-center mb-4'>
        <Logo />
      </header>
      <main>{children}</main>
    </div>
  );
}
