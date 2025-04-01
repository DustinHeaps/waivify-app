import Link from "next/link";

export const metadata = {
  title: "Page Not Found – Waivify",
  description:
    "Oops! The page you’re looking for doesn’t exist. Return to Waivify and keep it simple.",
};

export default async function NotFound() {
  return (
    <div className='max-w-md mx-auto mt-20 bg-white p-6 rounded-xl shadow-md text-center'>
      <div className='bg-white rounded-xl p-8 max-w-md text-center'>
        <h1 className='text-2xl font-bold text-red-600 mb-2'>
          🛑 Page Not Found
        </h1>
        <p className='text-gray-600 mb-6'>
          The page you're looking for doesn’t exist or has been moved.
        </p>

        <Link
          href='/'
          className='inline-block bg-teal-500 hover:bg-teal-600 text-white px-6 py-2 rounded mb-3 transition'
        >
          Return Home
        </Link>

        <div className='text-sm text-gray-500 mt-2'>
          <span>Think this is a mistake?</span>{" "}
          <a
            href='mailto:support@yourapp.com'
            className='text-blue-500 hover:underline'
          >
            Contact Support
          </a>
        </div>
      </div>
    </div>
  );
}
