import { db } from "@/lib/prisma";
import { PingDBButton } from "./components/PingDBButton";
import { getWeeklyWaivers } from "@/app/actions/analytics";

export default async function HealthDashboard() {
  const { labels, counts } = await getWeeklyWaivers();
  const totalWaiversThisWeek = counts.reduce((sum, n) => sum + n, 0);

  const userCount = await db.user.count();
  const waiverCount = await db.waiver.count();

  const dbStatus = waiverCount !== null ? "Connected" : "Error";

  return (
    <>
      <div className='p-6'>
        <h1 className='text-2xl font-bold mb-4'>System Health</h1>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
          <div className='rounded-xl border p-4'>
            <p className='text-muted-foreground text-sm'>Total Users</p>
            <p className='text-2xl font-bold'>{userCount}</p>
          </div>

          <div className='rounded-xl border p-4'>
            <p className='text-muted-foreground text-sm'>Total Waivers</p>
            <p className='text-2xl font-bold'>{waiverCount}</p>
          </div>

          <div className='rounded-xl border p-4'>
            <p className='text-muted-foreground text-sm'>Database Status</p>
            <p
              className={`text-2xl font-bold ${dbStatus === "Connected" ? "text-green-600" : "text-red-600"}`}
            >
              {dbStatus}
            </p>
          </div>
        </div>
      </div>
      <PingDBButton />
      <h2 className='text-xl font-bold mt-10 mb-4'>Waivers This Week</h2>
      <p className='text-sm text-muted-foreground mb-4'>
        {totalWaiversThisWeek > 0
          ? `${totalWaiversThisWeek} waiver${totalWaiversThisWeek !== 1 ? "s" : ""} submitted`
          : "No waivers submitted yet 👀"}
      </p>
      {totalWaiversThisWeek === 0 ? (
        <div className='text-center text-sm text-muted-foreground py-10'>
          No waivers submitted yet this week 👀
        </div>
      ) : (
        <div className='grid grid-cols-7 gap-2'>
          {labels.map((label, idx) => (
            <div key={label} className='flex flex-col items-center'>
              <div
                className='w-6 bg-blue-600 rounded-t'
                style={{ height: `${counts[idx] * 10}px` }}
              />
              <p className='text-xs mt-1'>{label}</p>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
