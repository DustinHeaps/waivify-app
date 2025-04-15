import { useUser } from '@clerk/nextjs';


export const Hero = () => {
  const { user } = useUser();

  return (
    <div className='space-y-1'>
      <h1 className='text-2xl font-semibold'>Hey {user && user.firstName} 👋</h1>
      <p className='text-muted-foreground text-sm'>
        Welcome to Waivify. Here’s what’s happening in your account.
      </p>
    </div>
  );
};
