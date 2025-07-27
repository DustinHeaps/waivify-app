import Link from "next/link";
import SimpleWaiverForm from "@/components/DemoWaiverForm";
import { SignedIn, SignedOut, SignInButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";

export const metadata = {
  title: "Digital Waivers for Travel & Tour Guides | Waivify",
  description:
    "Collect signed waivers before every tour. Clients sign from their phone — you get a PDF instantly. Built for travel guides, adventure operators, and group excursions.",
  keywords: [
    "travel waiver form",
    "tour guide liability waiver",
    "outdoor activity waiver",
    "adventure tour release form",
    "hiking waiver",
    "travel consent form",
    "guided tour liability form",
    "tour operator waiver",
  ],
};

export default function TravelLandingPage() {
  return (
    <main className='bg-white text-gray-900'>
      <h1 className='sr-only'>
        Digital Waivers and Release Forms for Travel & Tour Guides | Waivify
      </h1>

      {/* Hero */}
      <section className='py-24 px-6 text-center'>
        <h2 className='text-4xl md:text-5xl font-bold mb-4'>
          Waivers Made Easy for Travel & Tour Guides
        </h2>
        <p className='text-lg text-gray-600 max-w-xl mx-auto mb-8'>
          Send waivers before the trip — clients sign on their phone, and you
          get a signed PDF instantly. Perfect for outdoor adventures, walking
          tours, and more.
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
                Try a Travel Waiver – No Signup Needed
              </h3>
            </div>
            <div className='mt-4 mb-6 text-sm text-center text-gray-500'>
              This is a live demo of what your guests would fill out before a
              tour.{" "}
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
            Waivers for every kind of trip
          </h3>
          <div className='grid grid-cols-1 md:grid-cols-3 gap-8 text-left'>
            <div>
              <h4 className='font-semibold text-lg mb-2'>
                1. Customize your waiver
              </h4>
              <p className='text-gray-600'>
                Include activity risks, group size, emergency contact, or guide
                info — with full flexibility.
              </p>
            </div>
            <div>
              <h4 className='font-semibold text-lg mb-2'>2. Share the form</h4>
              <p className='text-gray-600'>
                Send via text/email ahead of time or display a QR code at the
                meetup spot for quick signing.
              </p>
            </div>
            <div>
              <h4 className='font-semibold text-lg mb-2'>
                3. Signed copies saved
              </h4>
              <p className='text-gray-600'>
                Every signed waiver is saved as a PDF, accessible anytime in
                your dashboard.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonial */}
      <section className='py-20 px-6 bg-gray-50'>
        <div className='max-w-3xl mx-auto text-center'>
          <p className='text-sm uppercase tracking-widest text-gray-500 mb-2'>
            Trusted by guides and operators
          </p>
          <h3 className='text-xl font-semibold mb-6'>
            “No more chasing down signatures at the trailhead.”
          </h3>
          <p className='text-gray-600 italic'>
            “I send the waiver link the day before the hike. Guests sign from
            their phone, and I focus on the experience — not the paperwork.”
          </p>
          <p className='mt-2 text-sm text-gray-500'>
            — Alex, Adventure Tour Guide, Colorado
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className='py-20 px-6 bg-[#000080] text-white text-center'>
        <h3 className='text-3xl font-semibold mb-4'>
          Ready to simplify your check-in process?
        </h3>
        <p className='text-lg mb-6'>
          Waivify keeps you legally covered and organized — even when you're off
          the grid.
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
