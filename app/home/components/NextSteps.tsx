"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import clsx from "clsx";

const GROUP_SIZE = 3;

type Step = {
  id: string;
  title: string;
  completed: boolean;
  type: "quick" | "stretch";
  current?: number;
  goal?: number;
};

const allSteps: Step[] = [
  {
    id: "1",
    title: "Complete Getting Started",
    completed: false,
    type: "quick",
  },
  {
    id: "2",
    title: "Create your second waiver",
    completed: false,
    type: "quick",
  },
  {
    id: "3",
    title: "Leave feedback or request a feature",
    completed: false,
    type: "quick",
  },
  { id: "4", title: "Share via QR code", completed: false, type: "quick" },
  {
    id: "5",
    title: "Customize waiver design",
    completed: false,
    type: "quick",
  },
  { id: "6", title: "Export waivers as CSV", completed: false, type: "quick" },
  { id: "7", title: "Save a waiver template", completed: false, type: "quick" },
  {
    id: "8",
    title: "Download your first waiver",
    completed: false,
    type: "quick",
  },
  {
    id: "9",
    title: "Create 10 waivers",
    completed: false,
    type: "stretch",
    current: 2,
    goal: 10,
  },
  {
    id: "10",
    title: "Create 25 waivers",
    completed: false,
    type: "stretch",
    current: 2,
    goal: 25,
  },
  {
    id: "11",
    title: "Create 50 waivers",
    completed: false,
    type: "stretch",
    current: 2,
    goal: 50,
  },
  {
    id: "12",
    title: "Create 100 waivers",
    completed: false,
    type: "stretch",
    current: 2,
    goal: 100,
  },
];

// 🟣 Compute initial pointer
const computeInitialPointer = () => {
  let pointer = 0;
  while (pointer < allSteps.length) {
    const group = allSteps.slice(pointer, pointer + GROUP_SIZE);
    if (group.every((s) => s.completed)) {
      pointer += GROUP_SIZE;
    } else {
      break;
    }
  }
  return pointer;
};

export const NextSteps = () => {
  // await updateNextStep("3", true);
  const [stepPointer, setStepPointer] = useState(() => computeInitialPointer());
  const [currentGroup, setCurrentGroup] = useState(
    allSteps.slice(stepPointer, stepPointer + GROUP_SIZE)
  );
  const [groupKey, setGroupKey] = useState(0); // 💡 to re-trigger AnimatePresence group

  const completedCount = allSteps.filter((s) => s.completed).length;
  const totalSteps = allSteps.length;

  // 🔁 Sync group when pointer changes
  useEffect(() => {
    setCurrentGroup(allSteps.slice(stepPointer, stepPointer + GROUP_SIZE));
  }, [stepPointer, allSteps.map((s) => s.completed).join(",")]);

  // ✅ Animate to next group if all current are completed
  useEffect(() => {
    if (currentGroup.length && currentGroup.every((s) => s.completed)) {
      const timeout = setTimeout(() => {
        setStepPointer((prev) => prev + GROUP_SIZE);
        setGroupKey((k) => k + 1);
      }, 400);
      return () => clearTimeout(timeout);
    }
  }, [currentGroup]);

  return (
    <div className='rounded-lg border bg-white p-5 space-y-3'>
      <div className='flex items-center justify-between'>
        <h2 className='text-sm font-medium text-muted-foreground'>
          Recommended Next Steps
        </h2>
        <span className='text-xs text-muted-foreground'>
          {completedCount}/12 completed
        </span>
      </div>

      <AnimatePresence mode='wait'>
        <motion.ul
          key={groupKey}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.3 }}
          className='space-y-2 min-h-[120px] text-sm'
        >
          {currentGroup.map((step) => (
            <li key={step.title} className='flex items-center space-x-2'>
              <span
                className={clsx(
                  "text-sm",
                  step.completed ? "text-green-600" : "text-gray-400"
                )}
              >
                {step.completed ? "✅" : "⬜"}
              </span>
              <span
                className={clsx(
                  "text-sm",
                  step.completed
                    ? "text-green-700 line-through"
                    : "text-gray-700"
                )}
              >
                {step.title}
              </span>
            </li>
          ))}
        </motion.ul>
      </AnimatePresence>
    </div>
  );
};
