import Image from "next/image";
import Link from "next/link";
import { SignedOut, SignInButton } from "@clerk/nextjs";
import { Card, CardContent } from "@/components/ui/card";

export const metadata = {
  title: "Personal Training Waivers Made Easy | Waivify for Trainers",
  description:
    "Waivify helps personal trainers collect signed waivers quickly and professionally. Mobile-friendly, branded, and legally binding.",
  keywords: [
    "personal trainer waiver",
    "fitness waiver app",
    "digital training waiver",
    "trainer client intake form",
    "Waivify personal training",
    "online fitness waivers",
    "personal training waiver form",
    "e-sign waivers fitness",
    "trainer consent form online",
  ],
};

export default function PersonalTrainingLandingPage() {
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
            Waivers That Work as Hard as You Do
          </h1>
          <p className='mt-4 text-lg text-gray-300'>
            Designed for personal trainers — quick, mobile, branded waivers your
            clients can sign before their first session.
          </p>
        </div>

        <section className='mt-16 grid md:grid-cols-2 gap-6 text-gray-300'>
          <Card>
            <CardContent className='p-6'>
              <h3 className='text-xl font-semibold mb-2'>
                🏋️‍♂️ Built for Personal Trainers
              </h3>
              <ul className='list-disc list-inside space-y-2'>
                <li>Custom branded waivers</li>
                <li>Clients sign on any device — no app</li>
                <li>Secure & legally binding</li>
                <li>Great for in-person or online sessions</li>
              </ul>
            </CardContent>
          </Card>
          <Card>
            <CardContent className='p-6'>
              <h3 className='text-xl font-semibold mb-2'>
                ⚡ Why Trainers Are Switching
              </h3>
              <ul className='list-disc list-inside space-y-2'>
                <li>No more paper or PDFs</li>
                <li>Instant access to signed forms</li>
                <li>Search, filter, and export anytime</li>
                <li>White-labeled for your brand</li>
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
