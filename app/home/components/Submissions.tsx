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
      <Card className='transition-all duration-200 py-0'>
        <CardContent className='p-6 md:p-8 text-center space-y-3'>
          <h2 className='text-base font-semibold text-gray-900'>
            See All Submissions 📄
          </h2>
          <p className='text-sm text-muted-foreground pb-[18px]'>
            View and manage every signed waiver in one place—search by name,
            filter by date, and export when needed.
          </p>
          <Link
            href='/dashboard'
            className='inline-block bg-black text-white text-sm px-4 py-2 rounded hover:bg-gray-800'
          >
            Go to Dashboard
          </Link>
        </CardContent>
      </Card>
    </motion.div>
  );
}
