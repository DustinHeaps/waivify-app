export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className='p-4'>
      <header className='flex justify-between items-center mb-4'>
        <div className='flex items-center space-x-2 font-bold text-lg'>
          <img src='/logo.png' alt='Waivify Logo' className='w-6 h-6' />
          <span>Waivify</span>
        </div>
      </header>
      <main>{children}</main>
    </div>
  );
}
