export const metadata = {
  title: "Privacy Policy | Waivify",
  description:
    "Learn how Waivify collects, uses, and protects your personal data when using our platform.",
  openGraph: {
    title: "Privacy Policy | Waivify",
    description:
      "Learn how Waivify collects, uses, and protects your personal data when using our platform.",
    url: "https://waivify.com/privacy",
    siteName: "Waivify",
    images: [
      {
        url: "https://waivify.com/LegalOG-Rectangle.png",
        width: 1200,
        height: 630,
        alt: "Privacy Policy | Waivify",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Privacy Policy | Waivify",
    description:
      "Learn how Waivify collects, uses, and protects your personal data when using our platform.",
    images: ["https://waivify.com/LegalOG-Square.png"],
  },
};

export default function PrivacyPage() {
  return (
    <div className='max-w-3xl mx-auto py-12 px-4'>
      <h1 className='text-3xl font-bold text-navy mb-4'>Privacy Policy</h1>
      <p className='text-gray-700 mb-6'>
        This Privacy Policy explains how Waivify collects, uses, and protects
        your personal data when you use our platform.
      </p>
      <h2 className='font-semibold text-lg mt-6 mb-2'> • Data We Collect</h2>
      <p className='text-gray-700 mb-4'>
        We collect information you provide directly to us, such as your name,
        business details, and signatures collected through waivers.
      </p>
      <h2 className='font-semibold text-lg mt-6 mb-2'>
      • How We Use Your Data
      </h2>
      <p className='text-gray-700 mb-4'>
        Your data helps us provide our services, improve our features, and
        support your account. We do not sell your data.
      </p>
      <h2 className='font-semibold text-lg mt-6 mb-2'> • Security</h2>
      <p className='text-gray-700'>
        We implement standard security practices to protect your data from
        unauthorized access or disclosure.
      </p>
    </div>
  );
}
