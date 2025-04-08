"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { format } from "date-fns";

import { getAllWaivers } from "@/app/actions/waiver";
import { Card, CardContent } from '@/components/ui/card';

type Waiver = {
  id: string;
  name: string;
  date: any;
  status?: "Signed" | "Pending" | "Declined";
};

export default function RecentWaivers() {
  const [recent, setRecent] = useState<Waiver[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const all = await getAllWaivers();
      const topThree = all.slice(0, 3);
      // setRecent(topThree);
    };

    fetchData();
  }, []);

  return (
    <Card>
      <CardContent className="p-5 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-medium">Recent Waivers</h2>
          <Link href="/admin" className="text-xs text-blue-600 hover:underline">
            View All
          </Link>
        </div>

        {recent.length === 0 ? (
          <p className="text-sm text-muted-foreground">No waivers submitted yet.</p>
        ) : (
          <ul className="text-sm">
            {recent.map((waiver) => (
              <li key={waiver.id} className="py-1 flex justify-between">
                <span>{waiver.name}</span>
                <span className="text-muted-foreground">
                  {format(new Date(waiver.date), "MMM d")}
                </span>
              </li>
            ))}
          </ul>
        )}
      </CardContent>
    </Card>
  );
}
