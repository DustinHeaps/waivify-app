"use client";

import { motion } from "framer-motion";

import { Tips } from "./components/Tips";
import { Links } from "./components/Links";
import { Changelog } from "./components/Changelog";
import { Hero } from "./components/Hero";

import YourBrand from "./components/YourBrand";
import { PlanSummary } from "./components/PlanSummary";

import { Feedback } from "./components/Feedback";
import { useEffect, useState } from "react";
import { getUserById } from "../actions/user";
import { User } from "@prisma/client";
import { Submissions } from "./components/Submissions";
import { DefaultTemplatePicker } from "./components/DefaultTemplatePicker";
import { BestPractices } from "./components/BestPractices";

export default function HomePage() {
  const [dbUser, setDBUser] = useState<User | null>();

  useEffect(() => {
    const fetchUser = async () => {
      const user = await getUserById();

      setDBUser(user);
    };

    fetchUser();
  }, []);

  return (
    <div className='max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8 space-y-12'>
      <Hero />
      {/* --------------------- Row 1 --------------------- */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className='grid grid-cols-1 md:grid-cols-3 gap-8 border-t pt-8'
      >
        {/* <GetMoreDone /> */}
        {dbUser && <DefaultTemplatePicker user={dbUser} />}
        {dbUser && <BestPractices user={dbUser} />}
        {dbUser && <YourBrand plan='free' user={dbUser} />}
      </motion.div>

      {/* --------------------- Row 2 --------------------- */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className='grid grid-cols-1 md:grid-cols-3 gap-8 border-t pt-8'
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
        <Tips plan={dbUser?.plan as "free" | "starter" | "pro"} />
        <Links />
        <Changelog />
      </motion.div>
    </div>
  );
}
