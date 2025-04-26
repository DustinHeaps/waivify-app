"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { getWaiversPerHour } from "@/app/actions/analytics";

export function WaiverByHourChart() {
  const [data, setData] = useState<{ hour: string; waivers: number }[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      const res = await getWaiversPerHour();
      setData(res);
      setLoading(false);
    }
    fetchData();
  }, []);

  return (
    <div className='rounded-xl border p-6 bg-white'>
      <h2 className='text-lg font-semibold mb-4'>Peak Signing Hours</h2>
      {loading ? (
        <div className='h-[300px] flex items-center justify-center text-muted-foreground'>
          Loading chart...
        </div>
      ) : (
        <ResponsiveContainer width='100%' height={300}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray='3 3' />
            <XAxis dataKey='hour' />
            <YAxis allowDecimals={false} />
            <Tooltip />
            <Bar dataKey='waivers' fill='#000080' />
          </BarChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}
