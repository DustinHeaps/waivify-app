export const metadata = {
  title: "Terms of Service | Waivify",
  description: "Review Waivify's terms outlining your rights and responsibilities as a user of our platform.",
  openGraph: {
    title: "Terms of Service | Waivify",
    description: "Review Waivify's terms outlining your rights and responsibilities as a user of our platform.",
    url: "https://waivify.com/terms",
    siteName: "Waivify",
    images: [
      {
        url: "https://waivify.com/LegalOG.png", 
        width: 1200,
        height: 630,
        alt: "Terms of Service | Waivify",
      },
    ],
    locale: "en_US",
    type: "website",
  },
};


export default function TermsPage() {
    return (
      <div className="max-w-3xl mx-auto py-12 px-4">
        <h1 className="text-3xl font-bold text-teal-600 mb-4">Terms of Service</h1>
        <p className="text-gray-700 mb-6">
          These Terms of Service ("Terms") govern your access to and use of Waivify’s
          services, so please read them carefully.
        </p>
        <h2 className="font-semibold text-lg mt-6 mb-2">1. Use of Service</h2>
        <p className="text-gray-700 mb-4">
          You agree to use Waivify’s tools in compliance with all applicable laws and
          not for any unlawful purposes. You are responsible for all activity under
          your account.
        </p>
        <h2 className="font-semibold text-lg mt-6 mb-2">2. Account and Access</h2>
        <p className="text-gray-700 mb-4">
          You’re responsible for keeping your login credentials secure. Waivify isn’t
          liable for any loss or damage from unauthorized access to your account.
        </p>
        <h2 className="font-semibold text-lg mt-6 mb-2">3. Liability</h2>
        <p className="text-gray-700">
          Waivify is not liable for any indirect, incidental, or consequential damages
          resulting from your use of our platform. Use of Waivify is at your own risk.
        </p>
      </div>
    );
  }