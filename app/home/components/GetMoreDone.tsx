import { Card, CardContent } from "@/components/ui/card";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import CreateTemplateButton from "@/components/CreateTemplateButton";
import { getUserById } from "@/app/actions/user";

export function GetMoreDone() {
  return (
    <div className='space-y-6'>
      <AnimatePresence mode='wait'>
        <motion.div
          key='get-more-done'
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
        >
          <Card className='hover:scale-[1.01] transition-all duration-200 py-0'>
            <CardContent className='p-6 md:p-8 text-center space-y-3'>
              <h2 className='text-base font-semibold text-gray-900'>
                Set It Up Your Way ✏️
              </h2>
              <p className='text-sm text-muted-foreground'>
                Create and customize your waiver template in minutes—no
                technical skills required.
              </p>
              <span className='text-xs text-muted-foreground block'>
                Takes less than 2 minutes to complete
              </span>
              <div className='flex justify-center flex-wrap gap-2 pt-1'>
                <CreateTemplateButton />
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
