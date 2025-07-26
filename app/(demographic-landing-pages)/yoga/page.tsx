"use client";

import Link from "next/link";
import SimpleWaiverForm from "@/components/DemoWaiverForm";

import { SignedIn, SignedOut, SignInButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";

export const metadata = {
  title: "Yoga Waiver Form – Digital Waivers for Instructors | Waivify",
  description:
    "Create and share yoga waivers in under 2 minutes. Perfect for group classes, retreats, or private sessions. No paper. No hassle. Try Waivify free.",
  keywords: [
    "yoga waiver form",
    "digital yoga waiver",
    "yoga liability waiver",
    "online yoga waiver",
    "yoga waiver app",
    "waiver for yoga instructors",
    "sign yoga waiver online",
  ],
};
export default function YogaLandingPage() {
  return (
    <main className='bg-white text-gray-900'>
      {/* SEO Boost */}
      <h1 className='sr-only'>
        Digital Yoga Waiver Form for Instructors | Waivify
      </h1>

      {/* Hero */}
      <section className='py-24 px-6 text-center'>
        <h2 className='text-4xl md:text-5xl font-bold mb-4'>
          Digital Waivers for Yoga Instructors
        </h2>
        <p className='text-lg text-gray-600 max-w-xl mx-auto mb-8'>
          Create and share waivers in under 2 minutes — perfect for group
          classes, retreats, or private sessions. No printing, no paperwork.
        </p>
        <div className='flex justify-center gap-4'>
          <SignedOut>
            <SignInButton mode='modal'>
              <Button className='bg-[#000080] text-base text-white px-6 py-6 rounded-xl hover:bg-opacity-90 transition'>
                Get Started Free
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

      {/* Embedded Demo Form */}
      <section className='py-20 px-6 bg-gray-50'>
        <div className='max-w-xl mx-auto'>
          <div className='bg-white border border-gray-200 rounded-xl p-6 shadow'>
            <div className='text-center mb-6'>
              <h3 className='text-2xl font-semibold'>
                Try It Now – No Signup Needed
              </h3>
            </div>
            <div className='mt-4 mb-6 text-sm text-center text-gray-500'>
              This is a live demo.{" "}
              <Link
                href='/sign-up'
                className='text-[#000080] underline font-medium hover:text-opacity-80'
              >
                Want to customize this for your studio? → Sign up free
              </Link>
            </div>

            <SimpleWaiverForm />
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className='py-20 px-6'>
        <div className='max-w-4xl mx-auto text-center'>
          <h3 className='text-2xl md:text-3xl font-semibold mb-8'>
            How it works
          </h3>
          <div className='grid grid-cols-1 md:grid-cols-3 gap-8 text-left'>
            <div>
              <h4 className='font-semibold text-lg mb-2'>
                1. Customize your waiver
              </h4>
              <p className='text-gray-600'>
                Use a yoga waiver template or create your own with ease.
              </p>
            </div>
            <div>
              <h4 className='font-semibold text-lg mb-2'>
                2. Share with students
              </h4>
              <p className='text-gray-600'>
                Send a link before class or post a QR code in your studio.
              </p>
            </div>
            <div>
              <h4 className='font-semibold text-lg mb-2'>
                3. Collect & download
              </h4>
              <p className='text-gray-600'>
                Waivers are stored securely and can be exported anytime.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className='py-20 px-6 bg-gray-50'>
        <div className='max-w-3xl mx-auto text-center'>
          <p className='text-sm uppercase tracking-widest text-gray-500 mb-2'>
            Trusted by yoga instructors
          </p>
          <h3 className='text-xl font-semibold mb-6'>
            Save time and stay compliant with Waivify
          </h3>
          <p className='text-gray-600 italic'>
            “I used to collect paper waivers before every class. Now I just send
            a link and focus on teaching.”
          </p>
          <p className='mt-2 text-sm text-gray-500'>— Maya, Yoga Flow Studio</p>
        </div>
      </section>

      {/* CTA Footer */}
      <section className='py-20 px-6 bg-[#000080] text-white text-center'>
        <h3 className='text-3xl font-semibold mb-4'>
          Ready to simplify your waiver flow?
        </h3>
        <p className='text-lg mb-6'>
          Designed for yoga instructors — fast, easy, and paperless.
        </p>

        <SignedOut>
          <SignInButton mode='modal'>
            <Button className='bg-white text-base text-[#000080] px-6 py-6 rounded-xl hover:bg-opacity-90 transition'>
              Sign Up Free
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
            className=' underline hover:text-navy/85'
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
