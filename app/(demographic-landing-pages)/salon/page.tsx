import Link from "next/link";
import SimpleWaiverForm from "@/components/DemoWaiverForm";
import { SignedIn, SignedOut, SignInButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";

export const metadata = {
  title: "Salon Consent Forms – Digital Waivers for Hairstylists & Estheticians | Waivify",
  description:
    "Collect salon waivers and service consent forms online — perfect for hairstylists, estheticians, and brow/lash techs. Clients sign from their phone. You get a signed PDF instantly.",
  keywords: [
    "salon waiver form",
    "hair appointment waiver",
    "lash extension waiver",
    "esthetician consent form",
    "digital waiver for salons",
    "client intake form",
    "chemical service waiver",
    "brow waxing consent form",
  ],
  openGraph: {
    title: "Salon Consent Forms – Digital Waivers for Hairstylists & Estheticians | Waivify",
    description:
      "Waivify lets salon pros collect client consent digitally before every appointment. Fast, secure, and mobile-friendly.",
    url: "https://waivify.com/salon",
    type: "website",
    images: [
      {
        url: "https://your-og-url.com/salon.png",
        width: 1200,
        height: 630,
        alt: "Salon Waiver Form – Waivify",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Salon Consent Forms – Digital Waivers for Hairstylists & Estheticians | Waivify",
    description:
      "Waivify helps you stay legally covered and organized with mobile-friendly digital waivers for every salon service.",
    images: ["https://your-og-url.com/salon.png"],
  },
};

export default function SalonLandingPage() {
  return (
    <main className='bg-white text-gray-900'>
      <h1 className='sr-only'>
        Digital Consent Forms for Salons | Waivify
      </h1>

      {/* Hero */}
      <section className='py-24 px-6 text-center'>
        <h2 className='text-4xl md:text-5xl font-bold mb-4'>
          Digital Consent Forms for Salon Pros
        </h2>
        <p className='text-lg text-gray-600 max-w-xl mx-auto mb-8'>
          Have clients sign waivers before their appointment — straight from their phone.
          You stay protected, and they stay informed.
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
                Try a Salon Waiver – No Signup Needed
              </h3>
            </div>
            <div className='mt-4 mb-6 text-sm text-center text-gray-500'>
              This is a live demo of what your clients would fill out before their visit.{" "}
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
            Perfect for any service
          </h3>
          <div className='grid grid-cols-1 md:grid-cols-3 gap-8 text-left'>
            <div>
              <h4 className='font-semibold text-lg mb-2'>
                1. Start with a ready-made form
              </h4>
              <p className='text-gray-600'>
                Use templates for lash lifts, chemical treatments, waxing, or facials — or create your own.
              </p>
            </div>
            <div>
              <h4 className='font-semibold text-lg mb-2'>
                2. Clients sign before their visit
              </h4>
              <p className='text-gray-600'>
                Share your form via text or email, or have clients scan a QR code in your salon.
              </p>
            </div>
            <div>
              <h4 className='font-semibold text-lg mb-2'>
                3. Store signed copies automatically
              </h4>
              <p className='text-gray-600'>
                Every signed waiver is saved as a PDF — ready for reference or download any time.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonial */}
      <section className='py-20 px-6 bg-gray-50'>
        <div className='max-w-3xl mx-auto text-center'>
          <p className='text-sm uppercase tracking-widest text-gray-500 mb-2'>
            Trusted by solo stylists and studios
          </p>
          <h3 className='text-xl font-semibold mb-6'>
            “I feel protected and more professional.”
          </h3>
          <p className='text-gray-600 italic'>
            “Waivify makes my intake process so much easier. I have waivers for every service,
            and clients love how quick it is to sign from their phone.”
          </p>
          <p className='mt-2 text-sm text-gray-500'>
            — Maya, Independent Esthetician
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className='py-20 px-6 bg-[#000080] text-white text-center'>
        <h3 className='text-3xl font-semibold mb-4'>
          Make client intake effortless
        </h3>
        <p className='text-lg mb-6'>
          Waivify keeps your salon legally covered and running smoothly — all without paper forms.
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
