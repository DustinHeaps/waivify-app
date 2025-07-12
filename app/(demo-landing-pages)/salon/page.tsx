import Image from "next/image";
import { SignedOut, SignInButton } from "@clerk/nextjs";
import { Card, CardContent } from "@/components/ui/card";

export const metadata = {
  title: "Salon Consent Forms Made Easy | Waivify for Hair & Beauty",
  description:
    "Waivify simplifies waiver collection for hair, nail, and beauty salons. Fast, mobile-friendly, and customized to your brand.",
  keywords: [
    "salon waiver form",
    "hair salon consent",
    "beauty waiver form",
    "nail salon release form",
    "salon intake form",
    "Waivify salon",
    "digital salon waivers",
    "salon client consent",
    "hair treatment waiver",
    "beauty salon liability form",
  ],
};

export default function SalonLandingPage() {
  return (
    <div className='min-h-screen bg-gray-900 text-white py-10 px-4 sm:px-8'>
      <div className='max-w-5xl mx-auto'>
        <div className='text-center'>
          <Image
            src='/logo.png'
            alt='Waivify Logo'
            width={100}
            height={100}
            className='mx-auto mb-6'
          />
          <h1 className='text-4xl sm:text-5xl font-bold text-teal-400'>
            Professional Waivers for Salons
          </h1>
          <p className='mt-4 text-lg text-gray-300'>
            Collect signed consent forms for hair, nail, and beauty services — on any device, in seconds.
          </p>
        </div>

        <section className='mt-16 grid md:grid-cols-2 gap-6 text-gray-300'>
          <Card>
            <CardContent className='p-6'>
              <h3 className='text-xl font-semibold mb-2'>
                💅 Built for Salon Professionals
              </h3>
              <ul className='list-disc list-inside space-y-2'>
                <li>Customized for hair, nail, and skincare services</li>
                <li>Mobile-friendly for easy client signing</li>
                <li>Branded to match your business</li>
                <li>Secure, legally binding records</li>
              </ul>
            </CardContent>
          </Card>
          <Card>
            <CardContent className='p-6'>
              <h3 className='text-xl font-semibold mb-2'>
                🌟 Why Salons Choose Waivify
              </h3>
              <ul className='list-disc list-inside space-y-2'>
                <li>No paper, no hassle</li>
                <li>Works for appointments or walk-ins</li>
                <li>Instant access to signed waivers</li>
                <li>Supports multiple service types</li>
              </ul>
            </CardContent>
          </Card>
        </section>

        <section className='mt-20 text-center'>
          <h2 className='text-3xl font-bold mb-4 text-teal-400'>
            See Waivify in Action
          </h2>

          <div className='w-full h-[500px]'>
            <iframe
              className='w-full h-full rounded shadow-lg'
              src='https://www.youtube.com/embed/IMJKFzX5Sp4'
              title='Waivify Demo'
              allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
              allowFullScreen
            />
          </div>
        </section>

        <section className='mt-16 text-center'>
          <h2 className='text-2xl font-semibold mb-4'>
            Start Free — No Setup Required
          </h2>
          <p className='text-gray-400 mb-6'>
            Try Waivify today and start collecting waivers in minutes.
          </p>
          <SignedOut>
            <SignInButton mode='modal'>
              <button className='bg-teal-500 hover:bg-teal-400 px-5 py-2 rounded text-white font-medium'>
                Start Free
              </button>
            </SignInButton>
          </SignedOut>
        </section>
      </div>
    </div>
  );
}
