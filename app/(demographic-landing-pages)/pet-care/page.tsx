import Link from "next/link";
import SimpleWaiverForm from "@/components/DemoWaiverForm";
import { SignedIn, SignedOut, SignInButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";

export const metadata = {
  title: "Pet Care Liability Waivers – Digital Forms for Groomers, Sitters & Trainers | Waivify",
  description:
    "Create and send pet care waivers in seconds. Clients sign on their phone before the appointment. Great for groomers, trainers, pet sitters, and more.",
  keywords: [
    "pet care waiver",
    "dog grooming liability form",
    "pet sitter agreement",
    "dog training waiver",
    "veterinary consent form",
    "digital waiver for pet services",
    "animal service release form",
    "pet owner consent form",
  ],
  openGraph: {
    title: "Pet Care Liability Waivers – Digital Forms for Groomers, Sitters & Trainers | Waivify",
    description:
      "Waivify helps pet care pros collect digital waivers and consent forms before appointments — quick, secure, and mobile-friendly.",
    url: "https://waivify.com/pet-care",
    type: "website",
    images: [
      {
        url: "https://your-og-url.com/pet-care.png",
        width: 1200,
        height: 630,
        alt: "Pet Care Waiver Form – Waivify",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Pet Care Liability Waivers – Digital Forms for Groomers, Sitters & Trainers | Waivify",
    description:
      "Waivify makes it easy to collect pet care waivers — before a groom, walk, or training session. Try it free.",
    images: ["https://your-og-url.com/pet-care.png"],
  },
};

export default function PetCareLandingPage() {
  return (
    <main className='bg-white text-gray-900'>
      <h1 className='sr-only'>
        Digital Waivers for Pet Care Professionals | Waivify
      </h1>

      {/* Hero */}
      <section className='py-24 px-6 text-center'>
        <h2 className='text-4xl md:text-5xl font-bold mb-4'>
          Digital Waivers for Pet Care Professionals
        </h2>
        <p className='text-lg text-gray-600 max-w-xl mx-auto mb-8'>
          Get waivers signed before any groom, walk, or visit. Pet owners sign on their phone, and you get a PDF instantly.
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
                Try a Pet Care Waiver – No Signup Needed
              </h3>
            </div>
            <div className='mt-4 mb-6 text-sm text-center text-gray-500'>
              This is a live demo of what pet owners would fill out before a visit.{" "}
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
            Simple for you. Easy for pet owners.
          </h3>
          <div className='grid grid-cols-1 md:grid-cols-3 gap-8 text-left'>
            <div>
              <h4 className='font-semibold text-lg mb-2'>
                1. Start with a waiver template
              </h4>
              <p className='text-gray-600'>
                Use our ready-made pet care liability forms or customize your own with pet details, risks, and terms.
              </p>
            </div>
            <div>
              <h4 className='font-semibold text-lg mb-2'>
                2. Send it before the appointment
              </h4>
              <p className='text-gray-600'>
                Share via text or email — or have pet parents sign on-site with a QR code.
              </p>
            </div>
            <div>
              <h4 className='font-semibold text-lg mb-2'>
                3. Store signed PDFs automatically
              </h4>
              <p className='text-gray-600'>
                Every waiver is saved in your dashboard with time stamps and pet owner info.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonial */}
      <section className='py-20 px-6 bg-gray-50'>
        <div className='max-w-3xl mx-auto text-center'>
          <p className='text-sm uppercase tracking-widest text-gray-500 mb-2'>
            Trusted by groomers and trainers
          </p>
          <h3 className='text-xl font-semibold mb-6'>
            “It keeps me covered without all the paper clutter.”
          </h3>
          <p className='text-gray-600 italic'>
            “I used to print waivers for every grooming session. Now I just send a link — pet owners sign ahead of time, and I have everything saved.”
          </p>
          <p className='mt-2 text-sm text-gray-500'>
            — Luis, Mobile Dog Groomer
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className='py-20 px-6 bg-[#000080] text-white text-center'>
        <h3 className='text-3xl font-semibold mb-4'>
          Make pet care paperwork painless
        </h3>
        <p className='text-lg mb-6'>
          Waivify helps you stay organized, professional, and protected — no clipboards required.
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
