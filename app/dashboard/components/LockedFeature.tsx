import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
  } from "@/components/ui/tooltip";
  
  type LockedFeatureProps = {
    plan: "free" | "starter" | "pro";
    children: React.ReactNode;
  };
  
  export function LockedFeature({ children, plan }: LockedFeatureProps) {
    if (plan !== "free") return <>{children}</>;
  
    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <div className='relative w-full cursor-not-allowed text-gray-400'>
              {children}
              <div className='absolute inset-0 z-10' />
            </div>
          </TooltipTrigger>
          <TooltipContent side='top'>
            <p className='text-sm font-medium text-gray-200'>
              Upgrade to Starter or Pro to unlock this feature
            </p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  }
  