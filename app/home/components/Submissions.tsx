import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import Link from "next/link";

export function Submissions() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
    >
      <Card className='transition-all duration-200 py-0 h-full'>
        <CardContent className='p-6 md:p-8 flex flex-col justify-between h-full'>
          <div>
            <h2 className='text-base font-semibold text-gray-900'>
              📄 All Signed Waivers
            </h2>
            <p className='text-sm text-muted-foreground mt-2'>
              View and manage every signed waiver in one place. Search by name,
              filter by date, and export submissions as a CSV.
            </p>
          </div>
          <Link
            href='/dashboard'
            className='mt-8 text-center inline-block bg-black text-white text-sm px-4 py-2 rounded hover:bg-gray-700'
          >
            Go to Dashboard
          </Link>
        </CardContent>
      </Card>
    </motion.div>
  );
}
