"use server";

import { trackEvent } from "@/lib/posthog/posthog.server";

import { db } from "@/lib/prisma";
import { startOfWeek, endOfWeek, subDays, getDay } from "date-fns";

export async function getWeeklyWaiverCount() {
  const start = startOfWeek(new Date(), { weekStartsOn: 0 });
  const end = endOfWeek(new Date(), { weekStartsOn: 0 });

  const count = await db.waiver.count({
    where: {
      date: {
        gte: start,
        lte: end,
      },
    },
  });

  return count;
}

export async function getWeeklyWaivers() {
  const start = startOfWeek(new Date(), { weekStartsOn: 0 }); // Sunday
  const end = endOfWeek(new Date(), { weekStartsOn: 0 }); // Saturday

  const waivers = await db.waiver.findMany({
    where: {
      date: {
        gte: start,
        lte: end,
      },
    },
    select: {
      date: true,
    },
  });

  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const dayCounts = Array(7).fill(0);

  waivers.forEach((w) => {
    const dayIndex = new Date(w.date).getDay();
    dayCounts[dayIndex]++;
  });

  return { labels: daysOfWeek, counts: dayCounts };
}

export async function getWaiversPerDay(mode: "week" | "7days" = "week") {
  let start: Date;
  let end: Date = new Date(); // always today

  if (mode === "week") {
    start = startOfWeek(new Date(), { weekStartsOn: 0 }); // Sunday
    end = endOfWeek(new Date(), { weekStartsOn: 0 });
  } else {
    start = subDays(new Date(), 6); // 7 days including today
  }

  const waivers = await db.waiver.findMany({
    where: {
      date: {
        gte: start,
        lte: end,
      },
    },
    select: {
      date: true,
    },
  });

  const counts: Record<string, number> = {};

  for (let waiver of waivers) {
    const day = waiver.date.toLocaleDateString("en-US", {
      month: "numeric",
      day: "numeric",
    });
    counts[day] = (counts[day] || 0) + 1;
  }

  const filledData = [];
  let current = start;
  while (current <= end) {
    const formatted = current.toLocaleDateString("en-US", {
      month: "numeric",
      day: "numeric",
    });
    filledData.push({
      date: formatted,
      waivers: counts[formatted] || 0,
    });
    current = new Date(current.getTime() + 24 * 60 * 60 * 1000); // next day
  }

  return filledData;
}
export async function getWaiversPerHour() {
  const start = startOfWeek(new Date(), { weekStartsOn: 0 });
  const end = endOfWeek(new Date(), { weekStartsOn: 0 });

  const waivers = await db.waiver.findMany({
    where: {
      date: {
        gte: start,
        lte: end,
      },
    },
    select: {
      date: true,
    },
  });

  const counts: Record<number, number> = {};

  for (let waiver of waivers) {
    const hour = waiver.date.getHours(); // 0-23
    counts[hour] = (counts[hour] || 0) + 1;
  }

  // Fill in all 24 hours
  const filledData = [];
  for (let i = 0; i < 24; i++) {
    filledData.push({
      hour: `${i}:00`,
      waivers: counts[i] || 0,
    });
  }

  return filledData;
}

export async function getHighlightStats() {
  const start = startOfWeek(new Date(), { weekStartsOn: 0 });
  const end = endOfWeek(new Date(), { weekStartsOn: 0 });

  const waivers = await db.waiver.findMany({
    where: {
      date: {
        gte: start,
        lte: end,
      },
    },
    select: {
      date: true,
    },
  });

  if (waivers.length === 0) {
    return {
      total: 0,
      busiestDay: "N/A",
      mostActiveHour: "N/A",
    };
  }

  const dayCounts: Record<number, number> = {};
  const hourCounts: Record<number, number> = {};

  for (let waiver of waivers) {
    const day = getDay(waiver.date); // 0 (Sun) - 6 (Sat)
    const hour = waiver.date.getHours(); // 0-23
    dayCounts[day] = (dayCounts[day] || 0) + 1;
    hourCounts[hour] = (hourCounts[hour] || 0) + 1;
  }

  const dayNames = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const busiestDay =
    dayNames[
      Object.entries(dayCounts).sort(
        (a, b) => b[1] - a[1]
      )[0][0] as unknown as number
    ];
  const mostActiveHour = `${Object.entries(hourCounts).sort((a, b) => b[1] - a[1])[0][0]}:00`;

  return {
    total: waivers.length,
    busiestDay,
    mostActiveHour,
  };
}

export async function getWeeklyWaiverDays() {
  const start = startOfWeek(new Date(), { weekStartsOn: 0 });
  const end = endOfWeek(new Date(), { weekStartsOn: 0 });

  const waivers = await db.waiver.findMany({
    where: {
      date: { gte: start, lte: end },
    },
    select: {
      date: true,
    },
  });

  const days = waivers.map((w) => w.date.getDay());
  const dayCounts = days.reduce((acc: Record<number, number>, day) => {
    acc[day] = (acc[day] || 0) + 1;
    return acc;
  }, {});

  return dayCounts;
}

export async function log404(path: string) {
  trackEvent({
    event: "404_page_view",
    distinctId: "server",
    properties: {
      path,
    },
  });
}

export async function markWaiverViewed(page: string) {
  await trackEvent({
    event: "waiver_viewed",
    distinctId: page,
  });

  //   await db.waiver.update({
  //     where: { id: waiverId },
  //     data: { viewedAt: new Date() },
  //   });

  return { success: true };
}
