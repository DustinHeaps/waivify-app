import Link from "next/link";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className='p-4'>
      <header className='flex justify-between items-center mb-4'>
        <div className='flex items-center space-x-2 font-bold text-lg'>
          <div className='flex items-center'>
            <Link href={"/home"}>
              <img src='/logo2.png' alt='Waivify Logo' className='w-10 h-10' />
            </Link>
            <Link href={"/home"}>Waivify</Link>
          </div>
        </div>
      </header>
      <main>{children}</main>
    </div>
  );
}
