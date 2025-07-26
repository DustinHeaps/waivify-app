import Link from "next/link";
import SimpleWaiverForm from "@/components/DemoWaiverForm";
import { SignedIn, SignedOut, SignInButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";

export const metadata = {
  title: "Event Participation Waivers – Digital Forms for Workshops, Classes & Retreats | Waivify",
  description:
    "Collect event participation waivers ahead of time — clients sign on their phone. Perfect for group classes, workshops, and retreats.",
  keywords: [
    "event participation waiver",
    "workshop waiver form",
    "retreat waiver template",
    "class liability form",
    "group event consent",
    "digital waiver for events",
    "participant release form",
    "in-person class waiver",
  ],
  openGraph: {
    title: "Event Participation Waivers – Digital Forms for Workshops, Classes & Retreats | Waivify",
    description:
      "Send participation waivers digitally before your workshop or class. Clients sign on their phone. You get a PDF instantly.",
    url: "https://waivify.com/events",
    type: "website",
    images: [
      {
        url: "https://your-og-url.com/events.png",
        width: 1200,
        height: 630,
        alt: "Event Participation Waiver – Waivify",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Event Participation Waivers – Digital Forms for Workshops, Classes & Retreats | Waivify",
    description:
      "Waivify makes it easy to collect signed participant waivers before your next class, seminar, or group event.",
    images: ["https://your-og-url.com/events.png"],
  },
};

export default function EventsLandingPage() {
  return (
    <main className='bg-white text-gray-900'>
      <h1 className='sr-only'>
        Digital Event Waivers for Classes and Workshops | Waivify
      </h1>

      {/* Hero */}
      <section className='py-24 px-6 text-center'>
        <h2 className='text-4xl md:text-5xl font-bold mb-4'>
          Event Participation Waivers Made Easy
        </h2>
        <p className='text-lg text-gray-600 max-w-xl mx-auto mb-8'>
          Send waivers before your class, workshop, or retreat. Participants sign on their phone — you get a signed PDF instantly.
        </p>
        <div className='flex justify-center gap-4'>
          <SignedOut>
            <SignInButton mode='modal'>
              <Button className='bg-[#000080] text-base text-white px-6 py-6 rounded-xl hover:bg-opacity-90 transition'>
                Try It Free
              </Button>
            </SignInButton>
          </SignedOut>
          <SignedIn>
            <Link href='/home'>
              <button className='btn-navy px-4 py-2 rounded'>
                Go to Dashboard
              </button>
            </Link>
          </SignedIn>
        </div>
      </section>

      {/* Demo Form */}
      <section className='py-20 px-6 bg-gray-50'>
        <div className='max-w-xl mx-auto'>
          <div className='bg-white border border-gray-200 rounded-xl p-6 shadow'>
            <div className='text-center mb-6'>
              <h3 className='text-2xl font-semibold'>
                Try a Class Waiver – No Signup Needed
              </h3>
            </div>
            <div className='mt-4 mb-6 text-sm text-center text-gray-500'>
              This is a live demo of what attendees would fill out.{" "}
              <div>
                <Link
                  href='/sign-up'
                  className='text-[#000080] underline font-medium hover:text-opacity-80'
                >
                  Want to keep it? → Sign up to save
                </Link>
              </div>
            </div>

            <SimpleWaiverForm />
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className='py-20 px-6'>
        <div className='max-w-4xl mx-auto text-center'>
          <h3 className='text-2xl md:text-3xl font-semibold mb-8'>
            Perfect for any kind of group session
          </h3>
          <div className='grid grid-cols-1 md:grid-cols-3 gap-8 text-left'>
            <div>
              <h4 className='font-semibold text-lg mb-2'>
                1. Choose a waiver template
              </h4>
              <p className='text-gray-600'>
                Start with a ready-made event form or create your own for your class, workshop, or seminar.
              </p>
            </div>
            <div>
              <h4 className='font-semibold text-lg mb-2'>
                2. Share before the event
              </h4>
              <p className='text-gray-600'>
                Email a link or post a QR code at check-in — attendees can sign right from their phone.
              </p>
            </div>
            <div>
              <h4 className='font-semibold text-lg mb-2'>
                3. Signed copies are saved automatically
              </h4>
              <p className='text-gray-600'>
                Each waiver is stored as a PDF in your dashboard — tied to each participant and date.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonial */}
      <section className='py-20 px-6 bg-gray-50'>
        <div className='max-w-3xl mx-auto text-center'>
          <p className='text-sm uppercase tracking-widest text-gray-500 mb-2'>
            Loved by instructors & organizers
          </p>
          <h3 className='text-xl font-semibold mb-6'>
            “I send waivers with every signup link now.”
          </h3>
          <p className='text-gray-600 italic'>
            “I run weekend workshops, and Waivify lets me handle liability forms ahead of time. No more paper clipboards or rushing at the door.”
          </p>
          <p className='mt-2 text-sm text-gray-500'>
            — Elena, Workshop Host & Retreat Leader
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className='py-20 px-6 bg-[#000080] text-white text-center'>
        <h3 className='text-3xl font-semibold mb-4'>
          Get ready for your next event — stress-free
        </h3>
        <p className='text-lg mb-6'>
          Waivify handles your waivers so you can focus on the experience, not the paperwork.
        </p>

        <SignedOut>
          <SignInButton mode='modal'>
            <Button className='bg-white text-base text-[#000080] px-6 py-6 rounded-xl hover:bg-opacity-90 transition'>
              Try It Free
            </Button>
          </SignInButton>
        </SignedOut>
        <SignedIn>
          <Link href='/home'>
            <button className='bg-white px-4 py-2 rounded text-[#000080] hover:bg-opacity-90 transition'>
              Go to Dashboard
            </button>
          </Link>
        </SignedIn>
      </section>

      {/* Footer */}
      <footer className='text-navy py-10 text-center text-sm'>
        <p>
          © {2025} Waivify ·{" "}
          <Link
            target='_blank'
            href='/policy'
            className='underline hover:text-navy/85'
          >
            Digital Signature Policy
          </Link>{" "}
          ·{" "}
          <Link
            target='_blank'
            href='/terms'
            className='underline hover:text-navy/85'
          >
            Terms of Service
          </Link>{" "}
          ·{" "}
          <Link
            target='_blank'
            href='/privacy'
            className='underline hover:text-navy/85'
          >
            Privacy Policy
          </Link>
        </p>
      </footer>
    </main>
  );
}
