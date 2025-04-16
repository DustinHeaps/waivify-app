"use client";

import Image from "next/image";
import { motion } from "framer-motion";
// import { TallyScript } from "@/components/TallyScript";

import Logo from "@/public/logo.png";
// import { Card, CardContent } from "../ui/card";
import Link from "next/link";
import { Card, CardContent } from './ui/card';
import { JoinWaitlistButton } from './JoinWaitlistButton';

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

export default function LandingContent() {
  return (
    <div className='min-h-screen bg-gray-900 text-white p-6'>
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
        <JoinWaitlistButton />
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
          How It Works
        </h2>
        <div className='grid grid-cols-1 md:grid-cols-4 gap-6'>
          <motion.div variants={fadeInUp}>
            <Card>
              <CardContent className='p-6 text-center'>
                📝 Create branded waivers
              </CardContent>
            </Card>
          </motion.div>
          <motion.div variants={fadeInUp}>
            <Card>
              <CardContent className='p-6 text-center'>
                📲 Share with a link or QR code
              </CardContent>
            </Card>
          </motion.div>
          <motion.div variants={fadeInUp}>
            <Card>
              <CardContent className='p-6 text-center'>
                ✍️ Clients sign on any device
              </CardContent>
            </Card>
          </motion.div>
          <motion.div variants={fadeInUp}>
            <Card>
              <CardContent className='p-6 text-center'>
                🗂️ Store & download waivers
              </CardContent>
            </Card>
          </motion.div>
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
        className='bg-gray-800 py-16 text-center'
        initial='hidden'
        whileInView='show'
        viewport={{ once: true }}
        variants={fadeInUp}
      >
        <h2 className='text-4xl font-bold mb-4 text-teal-400'>
          Be among the first to simplify your waivers.
        </h2>
        <p className='mb-6 text-gray-300'>
          Join the waitlist — it&apos;s free, and we’ll notify you as soon as we’re
          live.
        </p>
        <JoinWaitlistButton />
      </motion.section>

      <footer className='text-sm text-gray-400 text-center mt-10'>
        <p>
          © {new Date().getFullYear()} Waivify ·{" "}
          <Link target='_blank' href='/policy' className='underline hover:text-white'>
            Digital Signature Policy
          </Link>{" "}
          ·{" "}
          <Link target='_blank' href='/terms' className='underline hover:text-gray-700'>
            Terms of Service
          </Link>{" "}
          ·{" "}
          <Link target='_blank' href='/privacy' className='underline hover:text-gray-700'>
            Privacy Policy
          </Link>{" "}
        </p>
      </footer>
    </div>
  );
}
