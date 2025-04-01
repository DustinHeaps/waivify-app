export const QuickActions = () => {
  return (
    <div className='rounded-lg border bg-white p-5 space-y-3'>
      <h2 className='text-sm font-medium text-muted-foreground'>
        Quick Actions
      </h2>
      <div className='space-y-2'>
        <a
          href='/exports'
          className='flex items-center justify-between rounded border px-3 py-1 text-sm hover:bg-gray-50 transition'
        >
          <span>View Exports</span>
          <span className='text-muted-foreground'>→</span>
        </a>
        <a
          href='/account'
          className='flex items-center justify-between rounded border px-3 py-1 text-sm hover:bg-gray-50 transition'
        >
          <span>Account Settings</span>
          <span className='text-muted-foreground'>→</span>
        </a>
        <a
          href='/billing'
          className='flex items-center justify-between rounded border px-3 py-1 text-sm hover:bg-gray-50 transition'
        >
          <span>Billing & Plan</span>
          <span className='text-muted-foreground'>→</span>
        </a>
      </div>
    </div>
  );
};
