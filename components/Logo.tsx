import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import Link from "next/link";

export const Logo = () => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Link href="/home" className="flex items-center space-x-2 font-bold text-lg cursor-pointer">
            <img src='/logo2.png' alt='Waivify Logo' className='w-10 h-10' />
            <span>Waivify</span>
          </Link>
        </TooltipTrigger>
        <TooltipContent>
          <p>Go to Home Page</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};