import Link from "next/link";
import SimpleWaiverForm from "@/components/DemoWaiverForm";
import { SignedIn, SignedOut, SignInButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";

export const metadata = {
  title:
    "Photography Release Form – Digital Waivers for Photographers | Waivify",
  description:
    "Send digital photography waivers and model releases in seconds. Clients sign on their phone. You get a signed PDF instantly. Built for photographers, studios, and event pros.",
  keywords: [
    "photography release form",
    "photo model release",
    "digital waiver for photographers",
    "photography consent form",
    "event photo waiver",
    "portrait waiver form",
    "photo shoot liability waiver",
    "photographer client form",
  ],
  openGraph: {
    title:
      "Photography Release Form – Digital Waivers for Photographers | Waivify",
    description:
      "Waivify lets photographers send digital waivers and model releases to clients before a shoot. Easy, fast, and paperless.",
    url: "https://waivify.com/photographers",
    type: "website",
    images: [
      {
        url: "https://your-og-url.com/photographers.png",
        width: 1200,
        height: 630,
        alt: "Photography Model Release Form – Waivify",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title:
      "Photography Release Form – Digital Waivers for Photographers | Waivify",
    description:
      "Get signed releases before your shoot — Waivify makes it easy for photographers to stay covered and organized.",
    images: ["https://your-og-url.com/photographers.png"],
  },
};

export default function PhotographyLandingPage() {
  return (
    <main className='bg-white text-gray-900'>
      <h1 className='sr-only'>
        Digital Waivers and Release Forms for Photographers | Waivify
      </h1>

      {/* Hero */}
      <section className='py-24 px-6 text-center'>
        <h2 className='text-4xl md:text-5xl font-bold mb-4'>
          Digital Model Releases for Photographers
        </h2>
        <p className='text-lg text-gray-600 max-w-xl mx-auto mb-8'>
          Send waivers and consent forms before the shoot — clients sign on
          their phone, and you get a signed PDF instantly. No printing. No lost
          paperwork.
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
                Try a Photography Waiver – No Signup Needed
              </h3>
            </div>
            <div className='mt-4 mb-6 text-sm text-center text-gray-500'>
              This is a live demo of what your clients would fill out before a
              shoot.{" "}
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
            Easy waivers for any type of shoot
          </h3>
          <div className='grid grid-cols-1 md:grid-cols-3 gap-8 text-left'>
            <div>
              <h4 className='font-semibold text-lg mb-2'>
                1. Use or customize your form
              </h4>
              <p className='text-gray-600'>
                Start with a release form template or create your own. Include
                model consent, liability, image usage, and more.
              </p>
            </div>
            <div>
              <h4 className='font-semibold text-lg mb-2'>
                2. Share before the shoot
              </h4>
              <p className='text-gray-600'>
                Send the link via email or text before your session — or pull up
                a QR code on-site for fast signing.
              </p>
            </div>
            <div>
              <h4 className='font-semibold text-lg mb-2'>
                3. Store signed copies automatically
              </h4>
              <p className='text-gray-600'>
                Waivers are saved as PDFs and tied to each session. Easy to
                reference, download, or archive later.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonial */}
      <section className='py-20 px-6 bg-gray-50'>
        <div className='max-w-3xl mx-auto text-center'>
          <p className='text-sm uppercase tracking-widest text-gray-500 mb-2'>
            Built for working photographers
          </p>
          <h3 className='text-xl font-semibold mb-6'>
            “Waivify saves me a ton of admin time.”
          </h3>
          <p className='text-gray-600 italic'>
            “I use it before every shoot — clients sign on their phone and I
            have the release saved automatically. No more clipboards or lost
            papers.”
          </p>
          <p className='mt-2 text-sm text-gray-500'>
            — Claire, Freelance Portrait Photographer
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className='py-20 px-6 bg-[#000080] text-white text-center'>
        <h3 className='text-3xl font-semibold mb-4'>
          Ready to simplify your shoot prep?
        </h3>
        <p className='text-lg mb-6'>
          Waivify helps you stay covered, organized, and focused on the creative
          — not the paperwork.
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
