import Image from "next/image";
import { SignedOut, SignInButton } from "@clerk/nextjs";
import { Card, CardContent } from "@/components/ui/card";

export const metadata = {
  title: "Event Participation Waivers | Waivify for Workshops & Classes",
  description:
    "Waivify simplifies consent collection for workshops, classes, and group events. Mobile-friendly, branded, and legally binding.",
  keywords: [
    "event waiver form",
    "workshop consent form",
    "group class waiver",
    "event liability form",
    "digital event waiver",
    "Waivify event",
    "class participant form",
    "activity release form",
    "event registration waiver",
    "group event consent form",
  ],
};

export default function EventLandingPage() {
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
            Waivers That Simplify Group Events
          </h1>
          <p className='mt-4 text-lg text-gray-300'>
            Collect participation waivers for workshops, classes, and group
            activities — fast, secure, and on any device.
          </p>
        </div>

        <section className='mt-16 grid md:grid-cols-2 gap-6 text-gray-300'>
          <Card>
            <CardContent className='p-6'>
              <h3 className='text-xl font-semibold mb-2'>
                🧑‍🏫 Built for Events & Classes
              </h3>
              <ul className='list-disc list-inside space-y-2'>
                <li>Perfect for workshops, seminars, and classes</li>
                <li>Branded forms clients can sign from their phones</li>
                <li>Legally binding and securely stored</li>
                <li>Easy to use for instructors and organizers</li>
              </ul>
            </CardContent>
          </Card>
          <Card>
            <CardContent className='p-6'>
              <h3 className='text-xl font-semibold mb-2'>
                ✅ Why Organizers Choose Waivify
              </h3>
              <ul className='list-disc list-inside space-y-2'>
                <li>No more paper or clipboards</li>
                <li>Great for one-time or recurring events</li>
                <li>Instant access to signed forms</li>
                <li>Organized, searchable, and exportable</li>
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
              src='https://www.youtube.com/embed/IMJKFzX5Sp4'
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
