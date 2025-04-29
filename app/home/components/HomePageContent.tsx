"use client";

import { motion } from "framer-motion";
import { BestPractices } from "./BestPractices";
import { Changelog } from "./Changelog";
import { DefaultTemplatePicker } from "./DefaultTemplatePicker";
import { Feedback } from "./Feedback";
import { Hero } from "./Hero";
import { Links } from "./Links";
import { PlanSummary } from "./PlanSummary";
import { Submissions } from "./Submissions";
import { Tips } from "./Tips";
import YourBrand from "./YourBrand";
import { User } from "@prisma/client";

type Props = {
  user: User;
};

export const HomePageContent = ({ user }: Props) => {
  return (
    <div className='max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8 space-y-12'>
      {user && <Hero dbUser={user} />}
      {/* --------------------- Row 1 --------------------- */}

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className='grid grid-cols-1 md:grid-cols-3 gap-8 border-t pt-6'
      >
        {/* <div className='pt-10'>
      <h2 className='text-xl font-semibold text-gray-900 mb-1'>🧾 Template</h2>
        <p className='text-sm text-gray-600 mb-4'>
          Manage how your waiver templates appear to clients.
        </p>
        </div> */}

        {/* <GetMoreDone /> */}
        <div className='md:col-span-2'>
          <DefaultTemplatePicker user={user} />
        </div>
        {/* { <DefaultTemplatePicker user={user} />} */}
        {/* {<BestPractices user={user} />} */}
        {<YourBrand plan='free' user={user} />}
      </motion.div>

      {/* --------------------- Row 2 --------------------- */}
    
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className='grid grid-cols-1 md:grid-cols-3 gap-8 border-t pt-8 '
      >
        <Submissions />

        <PlanSummary />
        <Feedback />
      </motion.div>

      {/* --------------------- Row 3 --------------------- */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className='grid grid-cols-1 md:grid-cols-3 gap-8 border-t pt-8'
      >
        <Tips plan={user?.plan as "free" | "starter" | "pro"} />
        <Links />
        <Changelog />
      </motion.div>
    </div>
  );
};
