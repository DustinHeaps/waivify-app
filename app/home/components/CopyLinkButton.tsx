import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useState } from "react";

export const CopyLinkButton = ({ link }: { link: string }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(link);
    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <button
            onClick={handleCopy}
            className='text-xs font-medium border rounded-md px-3 py-1 hover:bg-primary hover:text-primary-foreground transition'
          >
            {copied ? "Copied" : "Copy Link"}
          </button>
        </TooltipTrigger>
      </Tooltip>
    </TooltipProvider>
  );
};
