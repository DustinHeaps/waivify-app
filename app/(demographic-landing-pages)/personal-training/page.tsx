import Link from "next/link";
import SimpleWaiverForm from "@/components/DemoWaiverForm";
import { SignedIn, SignedOut, SignInButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";

export const metadata = {
  title: "Personal Training Waiver – Digital Forms for Coaches | Waivify",
  description:
    "Create and send personal training waivers in seconds. Clients sign on their phone and you get a signed PDF instantly. No paper. No hassle.",
  keywords: [
    "personal training waiver",
    "fitness waiver form",
    "personal trainer liability form",
    "online training consent form",
    "digital fitness waiver",
    "waiver app for trainers",
    "client health questionnaire form",
  ],
  openGraph: {
    title: "Personal Training Waiver – Digital Forms for Coaches | Waivify",
    description:
      "Waivify helps personal trainers collect digital waivers before a session — perfect for gyms, remote coaching, or group training.",
    url: "https://waivify.com/personal-training",
    type: "website",
    images: [
      {
        url: "https://your-og-url.com/personal-training.png",
        width: 1200,
        height: 630,
        alt: "Digital Personal Training Waiver Example – Waivify",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Personal Training Waiver – Digital Forms for Coaches | Waivify",
    description:
      "Collect signed fitness waivers from clients before sessions — on-site or remote. Waivify makes it simple.",
    images: ["https://your-og-url.com/personal-training.png"],
  },
};

export default function PersonalTrainingLandingPage() {
  return (
    <main className='bg-white text-gray-900'>
      <h1 className='sr-only'>
        Digital Waivers for Personal Trainers | Waivify
      </h1>

      {/* Hero */}
      <section className='py-24 px-6 text-center'>
        <h2 className='text-4xl md:text-5xl font-bold mb-4'>
          Waivers Built for Personal Trainers
        </h2>
        <p className='text-lg text-gray-600 max-w-xl mx-auto mb-8'>
          Send digital liability waivers before each session — clients sign on
          their phone, and you get a signed PDF instantly. Zero paper, zero
          friction.
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
                Try a Personal Training Waiver – No Signup Needed
              </h3>
            </div>
            <div className='mt-4 mb-6 text-sm text-center text-gray-500'>
              This is a live demo of what your clients would fill out.{" "}
              <div>
                <Link
                  href='/sign-up'
                  className='text-[#000080] underline font-medium hover:text-opacity-80'
                >
                  Want to save it? → Create your account
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
            Train smarter — without paperwork
          </h3>
          <div className='grid grid-cols-1 md:grid-cols-3 gap-8 text-left'>
            <div>
              <h4 className='font-semibold text-lg mb-2'>
                1. Customize your waiver
              </h4>
              <p className='text-gray-600'>
                Use our fitness waiver template or write your own. Add health
                disclaimers, goals, or injury history questions.
              </p>
            </div>
            <div>
              <h4 className='font-semibold text-lg mb-2'>2. Share the link</h4>
              <p className='text-gray-600'>
                Send waivers ahead of time via text or email — or have them scan
                a QR code before class.
              </p>
            </div>
            <div>
              <h4 className='font-semibold text-lg mb-2'>
                3. Stay covered & organized
              </h4>
              <p className='text-gray-600'>
                Submissions are saved instantly. Download PDFs whenever you
                need, and stop chasing paperwork.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonial */}
      <section className='py-20 px-6 bg-gray-50'>
        <div className='max-w-3xl mx-auto text-center'>
          <p className='text-sm uppercase tracking-widest text-gray-500 mb-2'>
            Trusted by coaches & fitness pros
          </p>
          <h3 className='text-xl font-semibold mb-6'>
            “It’s one less thing I have to manage.”
          </h3>
          <p className='text-gray-600 italic'>
            “Waivify keeps my forms organized, and my clients love how easy it
            is to sign before training. Looks way more professional too.”
          </p>
          <p className='mt-2 text-sm text-gray-500'>
            — Jordan, Solo Strength Coach
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className='py-20 px-6 bg-[#000080] text-white text-center'>
        <h3 className='text-3xl font-semibold mb-4'>
          Ready to simplify your waiver flow?
        </h3>
        <p className='text-lg mb-6'>
          Try Waivify today — it’s built for solo trainers, group classes, and
          remote clients alike.
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
