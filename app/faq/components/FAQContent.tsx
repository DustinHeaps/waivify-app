"use client";

import { useState } from "react";

const faqs = [
  {
    question: "What is Waivify?",
    answer:
      "Waivify is a simple, mobile-friendly platform that lets businesses collect digital signatures through customizable waiver forms.",
  },
  {
    question: "How many waivers can I collect on the Free plan?",
    answer:
      "The Free plan includes 10 total waivers. Upgrade to Starter or Pro for higher limits and additional features.",
  },
  {
    question: "Can I customize my waivers?",
    answer:
      "Yes! You can add your logo, company name, QR codes, and reuse templates tailored to your business needs.",
  },
  {
    question: "What happens if I reach my waiver limit?",
    answer:
      "Once you reach your limit on the Free plan, you'll need to upgrade to continue collecting new waivers.",
  },
  {
    question: "How do I upgrade my plan?",
    answer:
      "You can upgrade anytime in your dashboard—your usage and data carry over seamlessly.",
  },
  {
    question: "Can I downgrade or cancel anytime?",
    answer:
      "Absolutely. You can switch plans or cancel anytime directly through your account dashboard.",
  },
  {
    question: "Is my data secure?",
    answer:
      "Yes. Waivify uses encrypted storage and legally binding e-signature protocols to keep your data safe and compliant.",
  },
  {
    question: "Can my clients sign on mobile devices?",
    answer:
      "Absolutely. Waivify is optimized for phones, tablets, and desktops — no app required.",
  },
  {
    question: "Do my waivers expire or get deleted?",
    answer:
      "Nope. As long as you stay within your plan’s limits, your waivers are safely stored and accessible at any time.",
  },
  {
    question: "Can I download signed waivers as PDFs?",
    answer:
      "Yes! Every signed waiver is exportable as a PDF for your records.",
  },
  {
    question: "Can I brand my waivers with my logo?",
    answer:
      "Yes. Paid plans allow you to upload your business logo and customize the appearance of your forms.",
  },
];

export const FAQContent = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };
  return (
    <div className='max-w-4xl mx-auto px-4 py-16'>
      <div className='text-center mb-12'>
        <h1 className='text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white'>
          Frequently Asked Questions
        </h1>
        <p className='mt-2 text-lg text-gray-600 dark:text-gray-300'>
          Find quick answers to common questions about Waivify.
        </p>
      </div>

      <div className='space-y-6'>
        {faqs.map((faq, index) => (
          <div key={index} className='border-b border-gray-200 pb-4'>
            <button
              onClick={() => toggle(index)}
              className='w-full text-left flex justify-between items-center py-3 text-lg font-medium text-black dark:text-white'
            >
              {faq.question}
              <span className='ml-4 text-gray-500'>
                {openIndex === index ? "-" : "+"}
              </span>
            </button>

            <div
              className={`overflow-hidden transition-all duration-300 ease-in-out ${
                openIndex === index
                  ? "max-h-40 opacity-100"
                  : "max-h-0 opacity-0"
              }`}
            >
              <p className='mt-2 text-gray-500 dark:text-gray-300'>
                {faq.answer}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className='text-center mt-12'>
        <p className='text-gray-700 dark:text-gray-300'>
          Still have questions?{" "}
          <a
            href='/support'
            className='text-blue-600 hover:underline dark:text-blue-400'
          >
            Contact Support
          </a>
        </p>
      </div>
    </div>
  );
};
