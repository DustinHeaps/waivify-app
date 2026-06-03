"use client";

import Link from "next/link";
import DemoWaiverForm from "@/components/DemoWaiverForm";
import { SignedIn, SignedOut, SignInButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";

export default function PersonalTrainingContent() {
  return (
    <main className='bg-white text-gray-900'>
      <h1 className='sr-only'>
        Digital Waivers for Personal Trainers | Waivify
      </h1>

      {/* Hero */}
      <section className='pt-16 pb-10 px-6 text-center'>
        <h2 className='text-4xl md:text-5xl font-bold mb-4 max-w-5xl mx-auto'>
          Stop Chasing Waivers — Get Them Signed Before Every Session
        </h2>

        <p className='text-xl text-gray-600 max-w-2xl mx-auto mb-4'>
          Clients sign from their phone before training starts.
        </p>

        <p className='text-lg text-gray-500 max-w-2xl mx-auto mb-6'>
          No printing. No clipboards. No chasing paperwork.
        </p>

        <div className='flex justify-center gap-3 flex-wrap text-sm text-gray-600 mb-8'>
          <span>✓ Share a link</span>
          <span>✓ Collect signatures</span>
          <span>✓ Download signed PDFs</span>
        </div>
        <SignedOut>
          <a href='#demo'>
            <Button className='bg-[#000080] text-base text-white px-6 py-6 rounded-xl hover:bg-opacity-90 transition'>
              Try the Live Demo
            </Button>
          </a>
        </SignedOut>
        <SignedIn>
          <Link href='/home'>
            <Button className='bg-[#000080] text-base text-white px-6 py-6 rounded-xl hover:bg-opacity-90 transition'>
             Go to Home Page
            </Button>
          </Link>
        </SignedIn>

        <p className='text-sm text-muted-foreground mt-3'>
          No signup required.
        </p>
      </section>

      {/* Demo Form */}
      <section id='demo' className='pt-6 pb-6 px-6 bg-gray-50'>
        <div className='max-w-lg mx-auto'>
          <div className='bg-white border border-gray-200 rounded-xl shadow p-5'>
            <div className='text-center mb-4'>
              <h3 className='text-2xl font-semibold'>
                Try the Client Waiver Demo
              </h3>
              <p className='text-sm text-gray-500 mt-2'>
                Fill out this sample waiver. After submitting, you’ll see where
                signed waivers are stored.
              </p>
            </div>

            <DemoWaiverForm  />
          </div>

          <a
            href='#benefits'
            className='mt-5 block text-center text-sm font-medium text-[#000080] hover:underline'
          >
            ↓ See why trainers use Waivify
          </a>
        </div>
      </section>
      {/* Trust Bar */}
      <section id='benefits' className='pt-6 py-12 px-6 bg-white'>
        <div className='max-w-5xl mx-auto bg-[#000080] text-white rounded-2xl p-8'>
          <div className='grid grid-cols-2 md:grid-cols-4 gap-6 text-center'>
            <div>
              <p className='text-3xl mb-2'>✓</p>
              <p className='text-sm md:text-base'>No client account required</p>
            </div>

            <div>
              <p className='text-3xl mb-2'>✓</p>
              <p className='text-sm md:text-base'>
                Signed PDFs saved automatically
              </p>
            </div>

            <div>
              <p className='text-3xl mb-2'>✓</p>
              <p className='text-sm md:text-base'>Share by link or QR code</p>
            </div>

            <div>
              <p className='text-3xl mb-2'>✓</p>
              <p className='text-sm md:text-base'>
                Create your first waiver in under 2 minutes
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Before / After */}
      <section className='py-16 px-6 bg-white'>
        <div className='max-w-5xl mx-auto text-center'>
          <h3 className='text-2xl md:text-3xl font-semibold mb-4'>
            Paper waivers create friction before training even starts
          </h3>
          <p className='text-gray-600 max-w-2xl mx-auto mb-10'>
            Waivify helps you collect signed waivers before clients show up, so
            your sessions start smoother.
          </p>

          <div className='grid grid-cols-1 md:grid-cols-2 gap-6 text-left'>
            <div className='rounded-xl border border-gray-200 bg-gray-50 p-6'>
              <h4 className='font-semibold text-lg mb-4'>Before Waivify</h4>
              <ul className='space-y-3 text-gray-600'>
                <li>❌ Clients forget to sign</li>
                <li>❌ Paper forms get lost</li>
                <li>❌ Last-minute paperwork before sessions</li>
                <li>❌ No easy way to find old waivers</li>
              </ul>
            </div>

            <div className='rounded-xl border border-green-200 bg-green-50 p-6'>
              <h4 className='font-semibold text-lg mb-4'>With Waivify</h4>
              <ul className='space-y-3 text-gray-700'>
                <li>✅ Send waivers before sessions</li>
                <li>✅ Clients sign from their phone</li>
                <li>✅ Signed PDFs are saved automatically</li>
                <li>✅ Keep every waiver organized in one place</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className='py-16 px-6 bg-gray-50'>
        <div className='max-w-5xl mx-auto text-center'>
          <h3 className='text-2xl md:text-3xl font-semibold mb-10'>
            How Waivify works
          </h3>

          <div className='grid grid-cols-1 md:grid-cols-3 gap-6 text-left'>
            <div className='rounded-xl bg-white border border-gray-200 p-6 shadow-sm'>
              <h4 className='font-semibold text-lg mb-2'>
                1. Create your waiver
              </h4>
              <p className='text-gray-600'>
                Start with a fitness waiver template or customize your own
                questions and terms.
              </p>
            </div>

            <div className='rounded-xl bg-white border border-gray-200 p-6 shadow-sm'>
              <h4 className='font-semibold text-lg mb-2'>2. Share your link</h4>
              <p className='text-gray-600'>
                Send it by text, email, or QR code so clients can sign before
                the session.
              </p>
            </div>

            <div className='rounded-xl bg-white border border-gray-200 p-6 shadow-sm'>
              <h4 className='font-semibold text-lg mb-2'>3. Stay organized</h4>
              <p className='text-gray-600'>
                Every submission is stored in your dashboard with signed PDFs
                ready to download.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className='py-16 px-6 bg-white'>
        <div className='max-w-3xl mx-auto'>
          <h3 className='text-2xl md:text-3xl font-semibold text-center mb-8'>
            Questions trainers usually ask
          </h3>

          <div className='space-y-4'>
            <div className='rounded-xl border border-gray-200 p-5'>
              <h4 className='font-semibold mb-2'>
                Do clients need an account?
              </h4>
              <p className='text-gray-600'>
                No. Clients can open your link and sign directly from their
                phone.
              </p>
            </div>

            <div className='rounded-xl border border-gray-200 p-5'>
              <h4 className='font-semibold mb-2'>Can I use my own waiver?</h4>
              <p className='text-gray-600'>
                Yes. You can use a template or customize the waiver language and
                fields.
              </p>
            </div>

            <div className='rounded-xl border border-gray-200 p-5'>
              <h4 className='font-semibold mb-2'>Do I get a signed PDF?</h4>
              <p className='text-gray-600'>
                Yes. Signed submissions are saved and can be downloaded whenever
                you need them.
              </p>
            </div>

            <div className='rounded-xl border border-gray-200 p-5'>
              <h4 className='font-semibold mb-2'>
                Can I share it with a QR code?
              </h4>
              <p className='text-gray-600'>
                Yes. You can share your waiver by link or QR code.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className='py-16 px-6 bg-[#000080] text-white text-center'>
        <h3 className='text-3xl font-semibold mb-4'>
          Start collecting signed waivers before your next session.
        </h3>
        <p className='text-lg mb-6 max-w-2xl mx-auto'>
          Create your waiver link, share it with clients, and keep every signed
          PDF organized in one place.
        </p>

        <SignedOut>
          <SignInButton mode='modal'>
            <Button className='bg-white text-base text-[#000080] px-6 py-6 rounded-xl hover:bg-opacity-90 transition'>
              Create Your Waiver Link
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
          © {new Date().getFullYear()} Waivify ·{" "}
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
