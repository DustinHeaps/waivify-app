// app/features/page.tsx

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Features | Waivify",
  description: "Explore all the features Waivify offers to streamline your waiver collection process.",
};

export default function FeaturesPage() {
  const features = [
    {
      title: "Custom Templates",
      description: "Create and reuse personalized waiver templates tailored to your business needs.",
    },
    {
      title: "Digital Signatures",
      description: "Collect legally binding signatures directly from clients on any device.",
    },
    {
      title: "Export & Archive",
      description: "Easily export signed waivers as PDFs and archive old submissions for recordkeeping.",
    },
    {
      title: "Analytics & Insights",
      description: "Track submission trends, peak usage times, and more (Pro feature).",
    },
    {
      title: "QR Code Sharing",
      description: "Instantly generate QR codes for clients to access waivers without hassle.",
    },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-10 space-y-10">
      <h1 className="text-3xl font-bold text-white">Waivify Features</h1>
      <p className="text-gray-400 text-lg">
        Everything you need to collect waivers simply and securely — wherever you do business.
      </p>

      <div className="grid gap-6 sm:grid-cols-2">
        {features.map((f, idx) => (
          <div key={idx} className="bg-white/5 rounded-lg p-6 border border-white/10 shadow-sm">
            <h2 className="text-xl font-semibold text-white mb-2">{f.title}</h2>
            <p className="text-gray-300 text-sm">{f.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
