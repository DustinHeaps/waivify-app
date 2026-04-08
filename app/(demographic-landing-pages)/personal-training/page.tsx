import PersonalTrainingContent from '@/components/PersonalTrainingContent';

export const metadata = {
  title: "Personal Training Waiver – Digital Forms for Coaches | Waivify",
  description:
    "Create and send personal training waivers in seconds. Clients sign on their phone and you get a signed PDF instantly. No paper. No hassle.",
  keywords: [
    "personal training waiver",
    "fitness waiver form",
    "personal trainer liability form",
    "online training consent form",
    "digital fitness waiver",
    "waiver app for trainers",
    "client health questionnaire form",
  ],
  openGraph: {
    title: "Personal Training Waiver – Digital Forms for Coaches | Waivify",
    description:
      "Waivify helps personal trainers collect digital waivers before a session — perfect for gyms, remote coaching, or group training.",
    url: "https://waivify.com/personal-training",
    type: "website",
    images: [
      {
        url: "https://www.waivify.com/OG-Rectangle.png",
        width: 1200,
        height: 630,
        alt: "Digital Personal Training Waiver Example – Waivify",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Personal Training Waiver – Digital Forms for Coaches | Waivify",
    description:
      "Collect signed fitness waivers from clients before sessions — on-site or remote. Waivify makes it simple.",
    images: ["https://www.waivify.com/OG-Square.png"],
  },
};

export default function PersonalTrainingLandingPage() {
  return <PersonalTrainingContent />
   
  
}
