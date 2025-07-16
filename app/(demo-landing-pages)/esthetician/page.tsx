import Image from "next/image";
import { SignedOut, SignInButton } from "@clerk/nextjs";
import { Card, CardContent } from "@/components/ui/card";

export const metadata = {
  title: "Esthetician Consent Forms Made Easy | Waivify for Skincare Pros",
  description:
    "Waivify helps estheticians and skincare professionals collect signed consent forms quickly and securely. Branded, mobile-friendly, and legally sound.",
  keywords: [
    "esthetician waiver",
    "facial consent form",
    "cosmetic procedure waiver",
    "skincare waiver app",
    "esthetician intake form",
    "Waivify esthetician",
    "online skincare waivers",
    "dermaplaning waiver",
    "chemical peel consent form",
    "esthetician liability waiver",
  ],
};

export default function EstheticianLandingPage() {
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
            Consent Forms That Elevate Your Practice
          </h1>
          <p className='mt-4 text-lg text-gray-300'>
            Designed for estheticians and skincare professionals — mobile,
            secure, and beautifully branded digital consent forms.
          </p>
        </div>
        <section className='mt-16 grid md:grid-cols-2 gap-6 text-gray-300'>
          <Card>
            <CardContent className='p-6'>
              <h3 className='text-xl font-semibold mb-2'>
                💆 Built for Skincare Professionals
              </h3>
              <ul className='list-disc list-inside space-y-2'>
                <li>Custom-branded intake and consent forms</li>
                <li>Clients sign from phone, tablet, or laptop</li>
                <li>Legally binding and securely stored</li>
                <li>Perfect for facials, peels, waxing, and more</li>
              </ul>
            </CardContent>
          </Card>
          <Card>
            <CardContent className='p-6'>
              <h3 className='text-xl font-semibold mb-2'>
                ✨ Why Estheticians Trust Waivify
              </h3>
              <ul className='list-disc list-inside space-y-2'>
                <li>Replace paper forms forever</li>
                <li>Instant access to all client waivers</li>
                <li>Search, export, and download with ease</li>
                <li>Professional look that matches your brand</li>
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
              src='https://www.youtube.com/embed/fENne-5FHR0'
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
