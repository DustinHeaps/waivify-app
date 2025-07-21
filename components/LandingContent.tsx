"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import Logo from "@/public/logo.png";
import Link from "next/link";
import { Card, CardContent } from "./ui/card";
import { SignedIn, SignedOut, SignInButton } from "@clerk/nextjs";
import FeaturedPosts from '@/app/(blog)/blog/components/FeaturedPosts';
import { fetchAllPosts } from '@/app/actions/post';
import { useEffect, useState } from 'react';
import { Post } from '@/types';

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

export default function LandingContent() {
   const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
      const getPosts = async () => {
        try {
          const posts = await fetchAllPosts();
          setPosts(posts);
        } catch (err) {
          console.error("Failed to fetch posts:", err);
        }
      };
  
      getPosts();
    }, []);

  const featured = posts.slice(0, 2);
  return (
    <div className='min-h-screen bg-gray-900 text-white py-6 px-4 sm:px-6 md:px-0'>
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
        Waivers made for modern service pros — not big clinics.
      </motion.p>

      <motion.section
        className='max-w-4xl mx-auto text-center py-12'
        initial='hidden'
        whileInView='show'
        viewport={{ once: true }}
        variants={fadeInUp}
      >
        <h1 className='text-5xl md:text-6xl font-bold text-teal-400 md:leading-[1.1]'>
          Create & Share Waivers in Under 2 Minutes
        </h1>
        <p className='text-lg my-8 text-gray-300'>
          Clients sign in 3 taps — no weird links or extra steps. Waivify is the
          modern tool they wish you had.
        </p>
        <SignedOut>
          <SignInButton mode='modal'>
            <button className=' bg-teal-500 px-6 py-3 rounded-lg text-white text-lg hover:bg-teal-400 transition'>
              Create Your First Waiver – Free
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
      <motion.section
        className='max-w-4xl mx-auto pb-12 text-center'
        initial='hidden'
        whileInView='show'
        viewport={{ once: true }}
        variants={fadeInUp}
      >
        <h2 className='text-3xl font-semibold mb-4 text-teal-400'>
          See Waivify in Action
        </h2>
        <p className='text-gray-300 mb-6'>
          Watch how fast you can create and share a waiver.
        </p>
        <div className='w-full h-[500px]'>
          <iframe
            className='w-full h-full rounded shadow-lg'
            src='https://www.youtube.com/embed/fENne-5FHR0'
            title='Waivify Demo Video'
            allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
            allowFullScreen
          />
        </div>
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
              <li>Salons & Estheticians</li>
              <li>Photographers</li>
            </ul>
            <ul className='space-y-2 list-disc list-inside'>
              <li>Fitness & Yoga Instructors</li>
              <li>Personal Trainers</li>
              <li>Event Hosts</li>
              <li>Small Business Pros</li>
            </ul>
          </div>
        </div>
      </motion.section>

      <motion.section
        className='max-w-5xl mx-auto py-12'
        initial='hidden'
        whileInView='show'
        viewport={{ once: true }}
        variants={fadeInUp}
      >
        <h2 className='text-3xl font-semibold text-center mb-8 text-teal-400'>
          From Idea to Signature in 60 Seconds
        </h2>
        <div className='grid grid-cols-1 md:grid-cols-4 gap-6 items-stretch'>
          {[
            "📝 Create your waiver",
            "📲 Share the link or QR code",
            "✍️ Client signs instantly",
            "🗂️ View & download anytime",
          ].map((text, i) => (
            <motion.div variants={fadeInUp} key={i} className='h-full'>
              <Card className='h-full flex flex-col'>
                <CardContent className='p-6 text-center flex-1 flex items-center justify-center'>
                  {text}
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.section>
      <motion.section
        className='max-w-4xl mx-auto py-16 text-center'
        initial='hidden'
        whileInView='show'
        viewport={{ once: true }}
        variants={fadeInUp}
      >
        <h2 className='text-3xl font-semibold mb-8 text-teal-400'>
          What Customers Are Saying
        </h2>

        <div className='grid md:grid-cols-2 gap-6 text-left text-gray-300'>
          <div className='bg-gray-800 p-6 rounded shadow'>
            <p>
              “I replaced paper forms at my tattoo shop in 10 minutes. Clients
              love it.”
            </p>
            <p className='mt-4 text-teal-400 font-semibold'>
              — Alex, Inkspire Tattoo
            </p>
          </div>
          <div className='bg-gray-800 p-6 rounded shadow'>
            <p>
              “I use Waivify for yoga classes. Everyone signs from their phone.
              So easy.”
            </p>
            <p className='mt-4 text-teal-400 font-semibold'>
              — Priya, Flow With Me Yoga
            </p>
          </div>
          <div className='bg-gray-800 p-6 rounded shadow'>
            <p>
              “Waivify made me look way more professional as a freelance
              trainer.”
            </p>
            <p className='mt-4 text-teal-400 font-semibold'>
              — Jordan, PT Anywhere
            </p>
          </div>
          <div className='bg-gray-800 p-6 rounded shadow'>
            <p>
              “No more paperwork chaos at our salon. Everything’s in one place
              now.”
            </p>
            <p className='mt-4 text-teal-400 font-semibold'>
              — Mia, Luxe Beauty Bar
            </p>
          </div>
        </div>
      </motion.section>

      <motion.section
        className='max-w-4xl mx-auto py-12 text-center'
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
          {[
            {
              title: "Free",
              price: "Free",
              benefits: [
                "Up to 10 waivers",
                "Basic templates",
                "Email Confirmations",
                "Mobile signing",
                "Basic dashboard access",
              ],
            },
            {
              title: "Pro",
              price: "$29/month",
              mostPopular: true,
              benefits: [
                "Unlimited waivers",
                "5 templates",
                "White-labeled (no Waivify branding)",
                "Calendly Integration",
                "Priority support",
                "Advanced analytics",
              ],
            },
            {
              title: "Starter",
              price: "$12/month",
              benefits: [
                "50 waivers/month",
                "1 saved waiver template",
                "Custom branding",
                "Email support",
                "Search, filter, export tools",
              ],
            },
          ].map((tier, i) => (
            <Card
              key={i}
              className={`relative bg-gray-800 transition-all duration-300 hover:shadow-lg hover:scale-[1.02] ${
                tier.mostPopular ? "border-2 border-teal-500" : ""
              }`}
            >
              {tier.mostPopular && (
                <div className='absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2'>
                  <span className='bg-teal-500 text-white text-xs px-3 py-1 rounded-full shadow-md uppercase font-semibold tracking-wide'>
                    Most Popular
                  </span>
                </div>
              )}
              <CardContent className='p-6'>
                <h3 className='text-xl font-semibold text-white mb-2'>
                  {tier.title}
                </h3>
                <p className='text-gray-400 mb-4'>{tier.price}</p>
                <ul className='list-disc list-inside text-gray-300 space-y-2'>
                  {tier.benefits.map((b, j) => (
                    <li key={j}>{b}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
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
          <li>Everything stored securely</li>
          <li>Go live in under 10 minutes</li>
        </ul>
        <p className='mt-6 text-teal-400'>
          <Link href='/blog' className='underline hover:text-white'>
            Browse the blog – waivers, workflows & wins →
          </Link>
        </p>
      </motion.section>

      <motion.section
        className='-mx-4 md:mx-0 bg-gray-800 py-12 text-center flex flex-col items-center justify-center'
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
      {/* <motion.section
        className='max-w-4xl mx-auto pt-12 text-center'
        initial='hidden'
        whileInView='show'
        viewport={{ once: true }}
        variants={fadeInUp}
      >
        <h2 className='text-3xl font-semibold mb-6 text-teal-400'>
          Featured Posts
        </h2> */}
        {/* <FeaturedPosts posts={featured} /> */}
        {/* <div className='grid md:grid-cols-3 gap-6 text-left'>
          {[
            {
              title: "What Makes a Waiver Legally Binding?",
              description:
                "We break down the must-haves for compliance — without the legal jargon.",
              href: "/blog/legally-binding-waivers",
            },
            {
              title: "Best Practices for Client Intake",
              description:
                "Make signups smoother and faster with these small but powerful tips.",
              href: "/blog/client-intake-best-practices",
            },
            {
              title: "How to Share Waivers via QR Code",
              description:
                "Drop the clipboard. Here’s how to share your waiver link instantly.",
              href: "/blog/share-waivers-with-qr-code",
            },
          ].map((post, i) => (
            <Link
              href={post.href}
              key={i}
              className='block bg-gray-800 rounded-lg p-6 hover:shadow-lg hover:bg-gray-700 transition'
            >
              <h3 className='text-lg font-semibold text-white mb-2'>
                {post.title}
              </h3>
              <p className='text-gray-400 text-sm'>{post.description}</p>
              <span className='text-teal-400 text-sm mt-4 inline-block'>
                Read more →
              </span>
            </Link>
          ))}
        </div>
      </motion.section> */}

      <footer className='text-sm text-gray-400 text-center mt-10'>
        <p>
          © {2025} Waivify ·{" "}
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
            className='underline hover:text-white'
          >
            Terms of Service
          </Link>{" "}
          ·{" "}
          <Link
            target='_blank'
            href='/privacy'
            className='underline hover:text-white'
          >
            Privacy Policy
          </Link>
        </p>
      </footer>
    </div>
  );
}
