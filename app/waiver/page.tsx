import SimpleWaiverForm from "@/components/SimpleWaiverForm";
import WaiverGuard from '@/components/WaiverGuard';
import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import { getUserById } from '../actions/user';
import { getWaiverLimit } from '@/lib/waiverUsage';
// import { markWaiverViewed } from "../actions/waiver";


export const metadata = {
  title: "Sign Your Waiver – Fast & Secure | Powered by Waivify",
  description:
    "Fill out and sign your waiver online in seconds. Waivify makes digital waiver signing fast, secure, and effortless.",
  keywords: [
    "sign waiver online",
    "digital waiver form",
    "e-sign waiver",
    "Waivify signature",
    "fill out consent form",
  ],
};

export default async function WaiverPage() {
    const { userId } = await auth();
  if (!userId) throw new Error("Not authenticated");

  const dbUser = await getUserById(userId);
  if (!dbUser) throw new Error("User not found");

  const waiversUsed = dbUser.waiverCount ?? 0;
  const plan = dbUser.plan ?? "free";
  const limit = getWaiverLimit(plan);

  if (waiversUsed >= limit) {
    redirect("/upgrade");
  }
  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-50 p-4'>
      <WaiverGuard>
        <SimpleWaiverForm />
      </WaiverGuard>
    </div>
  );
}
