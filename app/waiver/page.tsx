import SimpleWaiverForm from "@/components/SimpleWaiverForm";
// import { markWaiverViewed } from "../actions/waiver";
// import { redirect } from "next/navigation";
// import WaiverLimitGuard from '@/components/WaiverLimitGuard';
// import { useUser } from "@clerk/nextjs";
// import { currentUser } from "@clerk/nextjs/server";


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
//   const user = await currentUser();

//   await markWaiverViewed();

//   const waiversUsed = Number(user?.publicMetadata?.waiversUsed) || 0;
//   const plan = user?.publicMetadata?.plan || "free";

//   if (plan === "free" && waiversUsed >= 10) {
//     redirect("/upgrade");
//   }
  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-50 p-4'>
      {/* <WaiverLimitGuard> */}
        <SimpleWaiverForm />
      {/* </WaiverLimitGuard> */}
    </div>
  );
}
