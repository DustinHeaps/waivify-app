"use client";

import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { getHighlightStats } from "@/app/actions/analytics";

export function HighlightCards() {
  const [data, setData] = useState<{
    total: number;
    busiestDay: string;
    mostActiveHour: string;
  } | null>(null);

  useEffect(() => {
    async function fetchData() {
      const res = await getHighlightStats();
      setData(res);
    }
    fetchData();
  }, []);

  if (!data) {
    return null;
  }

  return (
    <div className='grid grid-cols-1 md:grid-cols-3 gap-4 mb-8'>
      <Card className='p-4'>
        <p className='text-sm text-muted-foreground'>Total Waivers This Week</p>
        <p className='text-2xl font-bold'>{data.total}</p>
      </Card>

      <Card className='p-4'>
        <p className='text-sm text-muted-foreground'>Busiest Day</p>
        <p className='text-2xl font-bold'>{data.busiestDay}</p>
      </Card>

      <Card className='p-4'>
        <p className='text-sm text-muted-foreground'>Most Active Hour</p>
        <p className='text-2xl font-bold'>{data.mostActiveHour}</p>
      </Card>
    </div>
  );
}
