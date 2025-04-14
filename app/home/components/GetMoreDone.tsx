import { Card, CardContent } from "@/components/ui/card";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import CreateTemplateButton from "@/components/CreateTemplateButton";

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
                Get More Done 🚀
              </h2>
              <p className='text-sm text-muted-foreground'>
                Create new waivers, track submissions, or export your data.
              </p>
              <div className='flex justify-center flex-wrap gap-2 pt-1'>
                <CreateTemplateButton />

                <Link
                  href='/admin'
                  className='px-4 py-2 border rounded text-sm hover:bg-gray-50 transition'
                >
                  View Dashboard
                </Link>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
