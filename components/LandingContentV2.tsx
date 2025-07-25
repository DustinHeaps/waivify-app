"use client";

import Link from "next/link";
import SimpleWaiverForm from "@/components/DemoWaiverForm";
import { BookmarkIcon } from "lucide-react";
import { SignedIn, SignedOut, SignInButton } from "@clerk/nextjs";
import { Button } from "./ui/button";


export default function LandingContentV2() {

  return (
    <main className='bg-white text-gray-900'>
      {/* Hero */}
      <section className='py-24 px-6 text-center'>
        <h1 className='text-4xl md:text-5xl font-bold mb-4'>
          Digital Waivers, Done Right
        </h1>
        <p className='text-lg text-gray-600 max-w-xl mx-auto mb-8'>
          Create and share your first waiver in under 2 minutes. No paper. No
          friction. Made for solo service providers.
        </p>
        <div className='flex justify-center gap-4'>
          <SignedOut>
            <SignInButton mode='modal'>
              <Button className='bg-[#000080] text-base text-white px-6 py-6 rounded-xl hover:bg-opacity-90 transition'>
                Get Started Free
              </Button>

              {/* <Link
                href='/account'
                className='border border-[#000080] text-[#000080] px-6 py-3 rounded-xl hover:bg-[#000080]/10 transition'
              >
                Sign In 
              </Link>*/}
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
              <h2 className='text-2xl font-semibold'>
                Try It Now – No Signup Needed
              </h2>
            </div>
            <div className='mt-4 mb-6 text-sm text-center text-gray-500'>
              This is a live demo.{" "}
              <Link
                href='/sign-up'
                className='text-[#000080] underline font-medium hover:text-opacity-80'
              >
                Want to keep this waiver? → Sign up to save
              </Link>
            </div>

            <SimpleWaiverForm />
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className='py-20 px-6'>
        <div className='max-w-4xl mx-auto text-center'>
          <h2 className='text-2xl md:text-3xl font-semibold mb-8'>
            How it works
          </h2>
          <div className='grid grid-cols-1 md:grid-cols-3 gap-8 text-left'>
            <div>
              <h3 className='font-semibold text-lg mb-2'>1. Create a waiver</h3>
              <p className='text-gray-600'>
                Use our simple editor or start from a template.
              </p>
            </div>
            <div>
              <h3 className='font-semibold text-lg mb-2'>
                2. Share with clients
              </h3>
              <p className='text-gray-600'>
                Send a link or print a QR code — no app required.
              </p>
            </div>
            <div>
              <h3 className='font-semibold text-lg mb-2'>
                3. Collect & export
              </h3>
              <p className='text-gray-600'>
                Track submissions and download signed copies anytime.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className='py-20 px-6 bg-gray-50'>
        <div className='max-w-3xl mx-auto text-center'>
          <p className='text-sm uppercase tracking-widest text-gray-500 mb-2'>
            Trusted by
          </p>
          <h2 className='text-xl font-semibold mb-6'>
            Yoga instructors, tattoo artists, and solo service pros
          </h2>
          <p className='text-gray-600'>
            “Waivify saves me hours every week. I just send the link and get
            back to work.”
          </p>
          <p className='mt-2 text-sm text-gray-500'>— Alex, Inkspire Tattoo</p>
        </div>
      </section>

      {/* CTA Footer */}
      <section className='py-20 px-6 bg-[#000080] text-white text-center'>
        <h2 className='text-3xl font-semibold mb-4'>Ready to get started?</h2>
        <p className='text-lg mb-6'>
          Create your first waiver today — it's free
        </p>

        <SignedOut>
          <SignInButton mode='modal'>
            <Button className='bg-white text-base text-[#000080] px-6 py-6 rounded-xl hover:bg-opacity-90 transion'>
              Sign Up Free
            </Button>
          </SignInButton>
        </SignedOut>
        <SignedIn>
          <Link href='/home'>
            <button className='bg-white px-4 py-2 rounded text-[#000080]   hover:bg-opacity-90 transion'>
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
