import Image from "next/image";
import Link from "next/link";
import { SignedOut, SignInButton } from "@clerk/nextjs";
import { Card, CardContent } from "@/components/ui/card";

export const metadata = {
  title: "Waivers for Yoga & Fitness Classes | Waivify for Instructors",
  description:
    "Waivify makes it easy for yoga, pilates, and fitness instructors to collect signed waivers — fast, mobile-friendly, and legally binding.",
  keywords: [
    "yoga waiver app",
    "fitness class waiver",
    "group fitness waiver",
    "digital fitness waiver form",
    "pilates waiver online",
    "Waivify yoga",
    "e-sign waivers fitness",
    "yoga liability waiver",
    "group class waiver form",
    "waiver software for instructors",
  ],
};

export default function YogaFitnessLandingPage() {
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
            Waivers That Flow With Your Class
          </h1>
          <p className='mt-4 text-lg text-gray-300'>
            Perfect for yoga, pilates, spin, and fitness classes — digital
            waivers your clients can sign before they even roll out the mat.
          </p>
        </div>

        <section className='mt-16 grid md:grid-cols-2 gap-6 text-gray-300'>
          <Card>
            <CardContent className='p-6'>
              <h3 className='text-xl font-semibold mb-2'>
                💪 Built for Group Instructors
              </h3>
              <ul className='list-disc list-inside space-y-2'>
                <li>Custom branded class waivers</li>
                <li>Clients sign on any device — no app</li>
                <li>Legally binding & secure</li>
                <li>Great for recurring classes and drop-ins</li>
              </ul>
            </CardContent>
          </Card>
          <Card>
            <CardContent className='p-6'>
              <h3 className='text-xl font-semibold mb-2'>
                ✨ Why Instructors Love Waivify
              </h3>
              <ul className='list-disc list-inside space-y-2'>
                <li>No more paper forms or waivers forgotten at home</li>
                <li>Instant access to signed forms</li>
                <li>Track participants & attendance</li>
                <li>White-labeled for your brand</li>
              </ul>
            </CardContent>
          </Card>
        </section>

        <section className='mt-20 text-center'>
          <h2 className='text-3xl font-bold mb-4 text-teal-400'>
            See How It Works
          </h2>

          <div className='w-full h-[500px]'>
            <iframe
              className='w-full h-full rounded shadow-lg'
              src='https://www.youtube.com/embed/IMJKFzX5Sp4'
              title='Waivify Demo for Instructors'
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
