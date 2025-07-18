export const metadata = {
  title: "Digital Signature Policy | Waivify",
  description:
    "Understand how Waivify manages and secures digital signatures for documents and waivers.",
  openGraph: {
    title: "Digital Signature Policy | Waivify",
    description:
      "Review Waivify's digital signature policy, ensuring legal compliance, data security, and trusted document handling.",
    images: [
      {
        url: "https://www.waivify.com/OGLegal-Rectangle.png",
        width: 1200,
        height: 630,
        alt: "Waivify Digital Signature Policy",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Digital Signature Policy | Waivify",
    description:
      "Understand how Waivify manages and secures digital signatures for documents and waivers.",
    images: ["https://www.waivify.com/OGLegal-Square.png"],
  },
};

export default function DigitalSignaturePolicyPage() {
  return (
    <div className="max-w-3xl mx-auto py-12 px-4">
      <h1 className='text-3xl font-bold text-teal-600 mb-6 flex items-center gap-2'>
        <span role='img' aria-label='pen'>
          🖋️
        </span>
        Digital Signature Policy
      </h1>

      <p className='mb-8 text-gray-700'>
        This Digital Signature Policy outlines how Waivify handles digital
        signatures for documents and waivers created through our platform.
      </p>

      <ul className='space-y-6'>
        <li>
          <h2 className='text-xl font-semibold text-black'>
            • Legal Effect of Digital Signatures
          </h2>
          <p className='mt-2 text-gray-700'>
            Digital signatures collected through Waivify are intended to be
            legally binding under applicable electronic signature laws, such as
            the{" "}
            <a
              href='https://www.fdic.gov/regulations/compliance/manual/pdf/XIII-1.1.pdf'
              target='_blank'
              rel='noopener noreferrer'
              className='text-teal-600 underline hover:text-teal-500'
            >
              U.S. Electronic Signatures in Global and National Commerce Act
              (ESIGN)
            </a>{" "}
            and the{" "}
            <a
              href='https://www.uniformlaws.org/committees/community-home?CommunityKey=2c04b76c-2b7d-4399-977e-d5876ba7e034'
              target='_blank'
              rel='noopener noreferrer'
              className='text-teal-600 underline hover:text-teal-500'
            >
              Uniform Electronic Transactions Act (UETA)
            </a>
            .
          </p>
        </li>

        <li>
          <h2 className='text-xl font-semibold text-black'>
            • Security and Integrity
          </h2>
          <p className='mt-2 text-gray-700'>
            Waivify ensures the authenticity and integrity of signed documents
            by storing all waivers securely with time-stamped signature data.
            Users may also download signed waivers as PDFs for their own
            records.
          </p>
        </li>

        <li>
          <h2 className='text-xl font-semibold text-black'>
            • User Responsibility
          </h2>
          <p className='mt-2 text-gray-700'>
            While Waivify provides tools to collect and store digital
            signatures, users are responsible for verifying that digital
            signatures meet the legal requirements in their specific industry or
            jurisdiction.
          </p>
        </li>

        <li>
          <h2 className='text-xl font-semibold text-black'>• Questions?</h2>
          <p className='mt-2 text-gray-700'>
            If you have any questions regarding our digital signature practices,
            feel free to contact us at{" "}
            <a
              href='mailto:support@waivify.com'
              className='text-teal-600 underline hover:text-teal-500'
            >
              support@waivify.com
            </a>
            .
          </p>
        </li>
      </ul>
    </div>
  );
}
