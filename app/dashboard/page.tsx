import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import Dashboard from "./Dashboard";
import { getAllWaivers, getAllWaiversByUser } from "../actions/waiver";

export const metadata = {
  title: "Your Waivify Submissions – Digital Waivers Made Simple",
  description:
    "View and manage your signed digital waivers easily with Waivify. Organized, secure, and always accessible.",
  keywords: [
    "waiver dashboard",
    "view signed waivers",
    "digital waiver records",
    "electronic waiver management",
    "Waivify submissions",
  ],
};

export default async function DashboardPage() {
  const { userId } = await auth();

  if (!userId) {
    return redirect("/");
  }

  const waivers = await getAllWaiversByUser({archived: false});



  return <Dashboard waivers={waivers} />;
}
