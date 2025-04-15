"use client";

import { motion } from "framer-motion";
import { GetMoreDone } from "./components/GetMoreDone";
import { QuickActions } from "./components/QuickActions";
import { RecentActivities } from "./components/RecentActivities";
import { Stats } from "./components/Stats";
import { Tips } from "./components/Tips";
import { Links } from "./components/Links";
import { Changelog } from "./components/Changelog";
import { Hero } from "./components/Hero";
import { NextSteps } from "./components/NextSteps";
import YourBrand from "./components/YourBrand";
import { PlanSummary } from "./components/PlanSummary";

import RecentWaivers from "./components/RecentWaivers";
import { Feedback } from "./components/Feedback";
import { useEffect, useState } from "react";
import { getUserById } from "../actions/user";
import { User } from "@prisma/client";
import { Submissions } from "./components/Submissions";

export default function HomePage() {
  const [dbUser, setDBUser] = useState<User | null>();

  useEffect(() => {
    const fetchUser = async () => {
      const result = await getUserById();

      setDBUser(result);
    };

    fetchUser();
  }, []);
  return (
    <div className='max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8 space-y-12'>
      <Hero  />
      {/* --------------------- Row 1 --------------------- */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className='grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-8 border-t pt-8 items-start'
      >
        <GetMoreDone />
        <YourBrand plan='free' user={dbUser!} />
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
        <Tips />
        <Links />
        <Changelog />
      </motion.div>
    </div>
  );
}
