type EmptyStateProps = {
  title: string;
  description: string;
  action?: React.ReactNode;
};

export const RecentActivities = () => {
  const EmptyState: React.FC<EmptyStateProps> = ({
    title,
    description,
    action,
  }) => (
    <div className='border rounded p-6 text-center space-y-2 text-muted-foreground'>
      <h3 className='text-sm font-semibold'>{title}</h3>
      <p className='text-sm'>{description}</p>
      {action}
    </div>
  );

  return (
    <div className='rounded-lg border bg-white p-5 space-y-3'>
      <h2 className='text-sm font-medium text-muted-foreground'>
        Recent Activity
      </h2>

      {/* <EmptyState
title='No activity yet'
description='Your recent activity will show here when you start collecting waivers.'
/> */}

      <ul className='text-sm space-y-1'>
        <li>✅ 2 waivers signed this week</li>
        <li>📄 5 active waivers</li>
        <li>✨ New: CSV Export is now available</li>
      </ul>
    </div>
  );
};
