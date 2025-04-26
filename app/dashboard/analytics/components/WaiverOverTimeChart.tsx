"use client";

import { getWaiversPerDay } from "@/app/actions/analytics";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

import { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { date: "4/10", waivers: 3 },
  { date: "4/11", waivers: 5 },
  { date: "4/12", waivers: 2 },
  { date: "4/13", waivers: 7 },
  { date: "4/14", waivers: 4 },
  { date: "4/15", waivers: 6 },
];

export function WaiverOverTimeChart() {
  const [data, setData] = useState<{ date: string; waivers: number }[]>([]);
  const [mode, setMode] = useState<"week" | "7days">("week");
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      const res = await getWaiversPerDay();
      setData(res);
      setLoading(false);
    }
    fetchData();
  }, [mode]);

  return (
    <div className='rounded-xl border p-6 bg-white'>
      <div className='flex items-center justify-between mb-4'>
        <h2 className='text-lg font-semibold'>Waivers Signed</h2>
        <div className='flex space-x-2'>
          <Button
            variant={mode === "7days" ? "default" : "outline"}
            onClick={() => setMode("7days")}
            size='sm'
          >
            Last 7 Days
          </Button>
          <Button
            variant={mode === "week" ? "default" : "outline"}
            onClick={() => setMode("week")}
            size='sm'
          >
            This Week
          </Button>
        </div>
      </div>

      {loading ? (
        <div className='h-[300px] flex items-center justify-center text-muted-foreground'>
          Loading chart...
        </div>
      ) : (
        <ResponsiveContainer width='100%' height={300}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray='3 3' />
            <XAxis dataKey='date' />
            <YAxis allowDecimals={false} />
            <Tooltip />
            <Line
              type='monotone'
              dataKey='waivers'
              stroke='#000080'
              strokeWidth={2}
            />
          </LineChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}
