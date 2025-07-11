"use client";

import Image from "next/image";
import { motion } from "framer-motion";

import Logo from "@/public/logo.png";
import Link from "next/link";
import { Card, CardContent } from "./ui/card";
import { SignedIn, SignedOut, SignInButton } from "@clerk/nextjs";

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

export default function LandingContent() {
  return (
    <div className='min-h-screen bg-gray-900 text-white py-6'>
      {/* <TallyScript /> */}

      <motion.div
        className='flex justify-center pt-10'
        initial='hidden'
        whileInView='show'
        viewport={{ once: true }}
        variants={fadeInUp}
      >
        <Image
          src={Logo}
          alt='Waivify Logo'
          width={120}
          height={120}
          className='mb-4'
        />
      </motion.div>

      <motion.p
        className='text-center text-teal-400 text-lg font-medium'
        initial='hidden'
        whileInView='show'
        viewport={{ once: true }}
        variants={fadeInUp}
      >
        Collect. Confirm. Keep it simple.
      </motion.p>

      <motion.section
        className='max-w-4xl mx-auto text-center py-16 '
        initial='hidden'
        whileInView='show'
        viewport={{ once: true }}
        variants={fadeInUp}
      >
        <h1 className='md:leading-[1.1] text-5xl md:text-6xl font-bold text-teal-400 '>
          Ditch the Paperwork. Get Waivers Signed in Seconds.
        </h1>
        <p className='text-lg my-8 text-gray-300'>
          A simple, mobile-friendly way for businesses to collect digital
          signatures — anywhere, anytime.
        </p>
        <SignedOut>
          <SignInButton mode='modal'>
            <button className='mt-6 bg-teal-500 px-6 py-3 rounded-lg text-white text-lg hover:bg-teal-400 transition'>
              Create Your First Waiver – Free
            </button>
          </SignInButton>
        </SignedOut>
        {/* <GetStartedButton /> */}
      </motion.section>

      <motion.section
        className='max-w-3xl mx-auto py-12'
        initial='hidden'
        whileInView='show'
        viewport={{ once: true }}
        variants={fadeInUp}
      >
        <h2 className='text-3xl font-semibold mb-8 text-center text-teal-400'>
          Perfect for:
        </h2>

        <div className='flex justify-center'>
          <div className='grid grid-cols-1 sm:grid-cols-2 gap-6 text-gray-300 text-left'>
            <ul className='space-y-2 list-disc list-inside'>
              <li>Tattoo Shops</li>
              <li>Pet Groomers</li>
              <li>Small Clinics</li>
            </ul>
            <ul className='space-y-2 list-disc list-inside'>
              <li>Yoga & Fitness Studios</li>
              <li>Tour Guides & Rentals</li>
              <li>Personal Care Pros</li>
            </ul>
          </div>
        </div>
      </motion.section>

      <motion.section
        className='max-w-5xl mx-auto py-16'
        initial='hidden'
        whileInView='show'
        viewport={{ once: true }}
        variants={fadeInUp}
      >
        <h2 className='text-3xl font-semibold text-center mb-8 text-teal-400'>
          From Idea to Signature in 60 Seconds
        </h2>
        <div className='grid grid-cols-1 md:grid-cols-4 gap-6'>
          <motion.div variants={fadeInUp}>
            <Card>
              <CardContent className='p-6 text-center'>
                📝 Create your waiver
              </CardContent>
            </Card>
          </motion.div>
          <motion.div variants={fadeInUp}>
            <Card>
              <CardContent className='p-6 text-center'>
                📲 Share the link or QR code
              </CardContent>
            </Card>
          </motion.div>
          <motion.div variants={fadeInUp}>
            <Card>
              <CardContent className='p-6 text-center'>
                ✍️ Client signs instantly
              </CardContent>
            </Card>
          </motion.div>
          <motion.div variants={fadeInUp}>
            <Card>
              <CardContent className='p-6 text-center'>
                🗂️ View & download anytime
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </motion.section>

      <motion.section
        className='max-w-4xl mx-auto py-16 text-center'
        initial='hidden'
        whileInView='show'
        viewport={{ once: true }}
        variants={fadeInUp}
      >
        <h2 className='text-3xl font-semibold mb-4 text-teal-400'>Pricing</h2>
        <p className='text-gray-300 mb-8'>
          Start for free — upgrade as you grow.
        </p>

        <div className='grid grid-cols-1 md:grid-cols-3 gap-6 text-left'>
          {/* Free Plan */}
          <Card className='bg-gray-800'>
            <CardContent className='p-6'>
              <h3 className='text-xl font-semibold text-white mb-2'>Free</h3>
              <p className='text-gray-400 mb-4'>Best for getting started</p>
              <ul className='list-disc list-inside text-gray-300 space-y-2'>
                <li>Up to 10 waivers</li>
                <li>Basic templates</li>
                <li>Email Confirmations</li>
                <li>Mobile signing</li>
                <li>
                  Basic dashboard access (view, download, archive, delete)
                </li>
              </ul>
            </CardContent>
          </Card>

          {/* Starter Plan */}
          <Card className='bg-gray-800'>
            <CardContent className='p-6'>
              <h3 className='text-xl font-semibold text-white mb-2'>Starter</h3>
              <p className='text-gray-400 mb-4'>$12/month</p>
              <ul className='list-disc list-inside text-gray-300 space-y-2'>
                <li>50 waivers/month</li>
                <li>1 saved waiver template</li>
                <li>Custom branding</li>
                <li>Email support</li>
                <li>
                  Advanced dashboard tools (search, filter, export, full
                  history)
                </li>
              </ul>
            </CardContent>
          </Card>

          {/* Pro Plan */}
          <Card className='bg-gray-800'>
            <CardContent className='p-6'>
              <h3 className='text-xl font-semibold text-white mb-2'>Pro</h3>
              <p className='text-gray-400 mb-4'>$29/month</p>
              <ul className='list-disc list-inside text-gray-300 space-y-2'>
                <li>Unlimited waivers</li>
                <li>5 waiver templates</li>
                <li>White-labeled waivers (no Waivify branding)</li>

                {/* <li>Google Calendar sync</li> */}
                <li>Priority support</li>
                <li>Access to advanced analytics</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </motion.section>

      <motion.section
        className='max-w-4xl mx-auto py-12 text-center'
        initial='hidden'
        whileInView='show'
        viewport={{ once: true }}
        variants={fadeInUp}
      >
        <h2 className='text-3xl font-semibold mb-8 text-teal-400'>
          Why You’ll Love It
        </h2>
        <ul className='list-disc list-inside space-y-2 text-gray-300'>
          <li>No paperwork, No printing</li>
          <li>Works on any device</li>
          <li>Legally binding signatures</li>
          <li>All waivers in one place</li>
          <li>Go live in under 10 minutes</li>
        </ul>
      </motion.section>
      <motion.section
        className='max-w-4xl mx-auto py-12 text-center'
        initial='hidden'
        whileInView='show'
        viewport={{ once: true }}
        variants={fadeInUp}
      >
        <h2 className='text-3xl font-semibold mb-8 text-teal-400'>
          <span role='img' aria-label='lock'>
            🔐
          </span>{" "}
          Trusted by Modern Businesses
        </h2>
        <p className='text-gray-300 max-w-2xl mx-auto'>
          Every waiver is protected by secure encryption, stored safely in the
          cloud, and backed by legally binding e-signature compliance. Your data
          stays private — always.
        </p>
      </motion.section>
      <motion.section
        className='bg-gray-800 py-16 text-center flex flex-col items-center justify-center'
        initial='hidden'
        whileInView='show'
        viewport={{ once: true }}
        variants={fadeInUp}
      >
        <h2 className='text-4xl font-bold mb-4 text-teal-400'>
          Ready to Ditch the Paperwork?
        </h2>
        <p className='mb-6 text-gray-300'>
          Create your first waiver, share it with a client, and see it signed —
          all in minutes.
        </p>
        <SignedOut>
          <SignInButton mode='modal'>
            <button className='bg-teal-500 px-4 py-2 rounded text-white hover:bg-teal-400'>
              Get Started
            </button>
          </SignInButton>
        </SignedOut>
        <SignedIn>
          <Link href='/home'>
            <button className='bg-teal-500 px-4 py-2 rounded text-white hover:bg-teal-400'>
              Go to Dashboard
            </button>
          </Link>
        </SignedIn>
      </motion.section>

      <footer className='text-sm text-gray-400 text-center mt-10'>
        <p>
          © {new Date().getFullYear()} Waivify ·{" "}
          <Link
            target='_blank'
            href='/policy'
            className='underline hover:text-white'
          >
            Digital Signature Policy
          </Link>{" "}
          ·{" "}
          <Link
            target='_blank'
            href='/terms'
            className='underline hover:text-gray-700'
          >
            Terms of Service
          </Link>{" "}
          ·{" "}
          <Link
            target='_blank'
            href='/privacy'
            className='underline hover:text-gray-700'
          >
            Privacy Policy
          </Link>{" "}
        </p>
      </footer>
    </div>
  );
}
