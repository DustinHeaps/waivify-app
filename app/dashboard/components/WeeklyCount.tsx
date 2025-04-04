"use client";

import { startOfWeek, isAfter } from "date-fns";

export default function WeeklyCount({ waivers }: { waivers: any[] }) {
  const weeklyCount = waivers.filter((w) =>
    isAfter(new Date(w.date), startOfWeek(new Date()))
  ).length;

  return (
    <div className='text-sm text-gray-600'>
      <strong>{weeklyCount}</strong> waivers submitted this week
    </div>
  );
}
