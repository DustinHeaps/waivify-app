"use client";

import { useMemo } from "react";
import { startOfMonth, startOfWeek, isAfter } from "date-fns";

export function useFilteredWaivers(
  waivers: any[],
  searchQuery: string,
  dateFilter: string
) {
  return useMemo(() => {
    return waivers.filter((w) => {
      const matchesSearch =
        w.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        w.id.toLowerCase().includes(searchQuery.toLowerCase());

      const waiverDate = new Date(w.date);
      const now = new Date();
      let matchesDate = true;

      if (dateFilter === "7days") {
        matchesDate = isAfter(waiverDate, startOfWeek(now));
      } else if (dateFilter === "month") {
        matchesDate = isAfter(waiverDate, startOfMonth(now));
      }

      return matchesSearch && matchesDate;
    });
  }, [waivers, searchQuery, dateFilter]);
}
