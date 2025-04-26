import { Button } from "@/components/ui/button";
import Link from "next/link";
import { WaiverOverTimeChart } from "./components/WaiverOverTimeChart";
import { WaiverByHourChart } from "./components/WaiverByHourChart";
import { HighlightCards } from "./components/HighlightCards";
import { LockedOverlay } from "./components/LockedOverlay";
import { getUserById } from "@/app/actions/user";

export default async function AnalyticsPage() {
  const user = await getUserById();
  return (
    <div className='p-6'>
      <div className='mb-4'>
        <Link href='/dashboard'>
          <Button variant='outline'>← Back to Dashboard</Button>
        </Link>
      </div>

      <h1 className='text-2xl font-bold mb-2'>Analytics & Insights</h1>
      <p className='text-muted-foreground mb-8'>
        Track your waiver activity over time.
      </p>

      {user?.plan !== "pro" ? (
        <div className='space-y-8'>
          <HighlightCards />
          <WaiverOverTimeChart />
          <WaiverByHourChart />
        </div>
      ) : (
        <>
          <div className='relative rounded-xl border p-6 bg-white'>
            <HighlightCards />
            <LockedOverlay text='Analytics Pro Feature' />
          </div>
          <div className='relative rounded-xl border p-6 bg-white'>
            <WaiverOverTimeChart />
            <LockedOverlay text='Analytics Pro Feature' />
          </div>
          <div className='relative rounded-xl border p-6 bg-white'>
            <WaiverByHourChart />
            <LockedOverlay text='Analytics Pro Feature' />
          </div>
        </>
      )}
    </div>
  );
}
