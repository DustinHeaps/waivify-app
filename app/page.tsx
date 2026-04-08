import LandingContent from "@/components/LandingContent";
import LandingContentV2 from '@/components/LandingContentV2';
import PersonalTrainingContent from '@/components/PersonalTrainingContent';

export const metadata = {
  title: "Waivify – The Simple Way to Collect Digital Waivers",
  description:
    "Waivify lets businesses collect, sign, and manage waivers online. No paper, no clutter. Just simple, secure waivers.",
};

export default function LandingPage() {
return <PersonalTrainingContent /> // Personal Training Page
  // return <LandingContentV2 />; // Regular Landing Page
}
