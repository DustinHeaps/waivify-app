import Image from "next/image";
import { SignedOut, SignInButton } from "@clerk/nextjs";
import { Card, CardContent } from "@/components/ui/card";

export const metadata = {
  title: "Photo & Video Consent Forms | Waivify for Creatives",
  description:
    "Waivify makes it easy for photographers and videographers to get permission to use client images — fast, mobile, and secure.",
  keywords: [
    "photography waiver",
    "photo consent form",
    "video release form",
    "photography release template",
    "photo model release",
    "Waivify photography",
    "digital image release form",
    "videography waiver app",
    "model consent form online",
    "photography session agreement",
  ],
};

export default function PhotographyLandingPage() {
  return (
    <div className='min-h-screen bg-gray-900 text-white py-10 px-4 sm:px-8'>
      <div className='max-w-5xl mx-auto'>
        <div className='text-center'>
          <Image
            src='/logo.png'
            alt='Waivify Logo'
            width={100}
            height={100}
            className='mx-auto mb-6'
          />
          <h1 className='text-4xl sm:text-5xl font-bold text-teal-400'>
            Get Consent, Protect Your Work
          </h1>
          <p className='mt-4 text-lg text-gray-300'>
            Built for photographers and videographers — mobile-friendly release
            forms your clients can sign in seconds.
          </p>
        </div>

        <section className='mt-16 grid md:grid-cols-2 gap-6 text-gray-300'>
          <Card>
            <CardContent className='p-6'>
              <h3 className='text-xl font-semibold mb-2'>
                📸 Designed for Creatives
              </h3>
              <ul className='list-disc list-inside space-y-2'>
                <li>Collect model and image releases online</li>
                <li>Branded forms your clients trust</li>
                <li>Works great for events, shoots, and sessions</li>
                <li>Legally binding and securely stored</li>
              </ul>
            </CardContent>
          </Card>
          <Card>
            <CardContent className='p-6'>
              <h3 className='text-xl font-semibold mb-2'>
                🌟 Why Creators Use Waivify
              </h3>
              <ul className='list-disc list-inside space-y-2'>
                <li>No more paper forms or PDFs</li>
                <li>Clients can sign from any device</li>
                <li>Instant access to signed documents</li>
                <li>Protect yourself with clear permissions</li>
              </ul>
            </CardContent>
          </Card>
        </section>

        <section className='mt-20 text-center'>
          <h2 className='text-3xl font-bold mb-4 text-teal-400'>
            See Waivify in Action
          </h2>

          <div className='w-full h-[500px]'>
            <iframe
              className='w-full h-full rounded shadow-lg'
              src='https://www.youtube.com/embed/fENne-5FHR0'
              title='Waivify Demo'
              allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
              allowFullScreen
            />
          </div>
        </section>

        <section className='mt-16 text-center'>
          <h2 className='text-2xl font-semibold mb-4'>
            Start Free — No Setup Required
          </h2>
          <p className='text-gray-400 mb-6'>
            Try Waivify today and start collecting waivers in minutes.
          </p>
          <SignedOut>
            <SignInButton mode='modal'>
              <button className='bg-teal-500 hover:bg-teal-400 px-5 py-2 rounded text-white font-medium'>
                Start Free
              </button>
            </SignInButton>
          </SignedOut>
        </section>
      </div>
    </div>
  );
}
