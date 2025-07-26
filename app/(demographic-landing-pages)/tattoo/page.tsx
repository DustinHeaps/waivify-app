import Link from "next/link";
import SimpleWaiverForm from "@/components/DemoWaiverForm";
import { SignedIn, SignedOut, SignInButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";

export const metadata = {
  title: "Tattoo Consent Form – Digital Waivers for Artists | Waivify",
  description:
    "Digital tattoo consent forms you can send, sign, and store in seconds. No printing, no paper. Built for artists, shops, and walk-ins.",
  keywords: [
    "tattoo consent form",
    "tattoo waiver form",
    "digital tattoo waiver",
    "tattoo shop release form",
    "online tattoo form",
    "waiver app for tattoo artists",
    "tattoo liability release",
  ],
  openGraph: {
    title: "Tattoo Consent Form – Digital Waivers for Artists | Waivify",
    description:
      "Ditch paper forms. Waivify lets tattoo artists collect digital waivers fast and securely — perfect for walk-ins and appointments.",
    url: "https://waivify.com/tattoo",
    type: "website",
    images: [
      {
        url: "https://your-og-url.com/tattoo.png", // Replace with actual OG image
        width: 1200,
        height: 630,
        alt: "Digital Tattoo Consent Form Example – Waivify",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Tattoo Consent Form – Digital Waivers for Artists | Waivify",
    description:
      "Digital tattoo waivers that take less than 2 minutes to send and sign. Built for modern artists.",
    images: ["https://your-og-url.com/tattoo.png"],
  },
};

export default function TattooLandingPage() {
  return (
    <main className='bg-white text-gray-900'>
      <h1 className='sr-only'>
        Digital Tattoo Waiver & Consent Form for Artists | Waivify
      </h1>

      {/* Hero */}
      <section className='py-24 px-6 text-center'>
        <h2 className='text-4xl md:text-5xl font-bold mb-4'>
          Digital Tattoo Consent Forms, Done Right
        </h2>
        <p className='text-lg text-gray-600 max-w-xl mx-auto mb-8'>
          Replace your paper release forms with secure, mobile-friendly waivers.
          Collect signatures online — before the session or right at the shop.
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

      {/* Demo Waiver */}
      <section className='py-20 px-6 bg-gray-50'>
        <div className='max-w-xl mx-auto'>
          <div className='bg-white border border-gray-200 rounded-xl p-6 shadow'>
            <div className='text-center mb-6'>
              <h3 className='text-2xl font-semibold'>
                Try a Tattoo Waiver – No Signup Needed
              </h3>
            </div>
            <div className='mt-4 mb-6 text-sm text-center text-gray-500'>
              See how easy it is for clients to sign online.{" "}
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
            No printers. No paperwork. No stress.
          </h3>
          <div className='grid grid-cols-1 md:grid-cols-3 gap-8 text-left'>
            <div>
              <h4 className='font-semibold text-lg mb-2'>
                1. Create your waiver
              </h4>
              <p className='text-gray-600'>
                Start with a tattoo consent template or build your own. Add age
                verification, medical history, terms, and image release.
              </p>
            </div>
            <div>
              <h4 className='font-semibold text-lg mb-2'>
                2. Share with clients
              </h4>
              <p className='text-gray-600'>
                Send a link before their appointment, or post a QR code at the
                shop for walk-ins to sign on the spot.
              </p>
            </div>
            <div>
              <h4 className='font-semibold text-lg mb-2'>
                3. Track & export submissions
              </h4>
              <p className='text-gray-600'>
                Each signed waiver is securely stored and downloadable. Never
                dig through folders again.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonial */}
      <section className='py-20 px-6 bg-gray-50'>
        <div className='max-w-3xl mx-auto text-center'>
          <p className='text-sm uppercase tracking-widest text-gray-500 mb-2'>
            Built with artists in mind
          </p>
          <h3 className='text-xl font-semibold mb-6'>
            “Waivify saves me hours every week.”
          </h3>
          <p className='text-gray-600 italic'>
            “I used to chase down paper waivers. Now clients sign on their
            phones, and I’ve got everything backed up instantly.”
          </p>
          <p className='mt-2 text-sm text-gray-500'>
            - Jess, Black Fern Studio
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className='py-20 px-6 bg-[#000080] text-white text-center'>
        <h3 className='text-3xl font-semibold mb-4'>
          Upgrade your waiver process today
        </h3>
        <p className='text-lg mb-6'>
          Waivify is the fast, paperless way to collect consent forms — built
          for tattoo artists and studios.
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
