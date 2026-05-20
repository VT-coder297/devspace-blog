import Link from 'next/link';
import Image from 'next/image';
import { Metadata } from 'next';

// This handles the browser tab title for your error page
export const metadata: Metadata = {
  title: 'Page Not Found',
};

export default function NotFoundPage() {
  return (
    <div className="flex flex-col items-center mt-20 text-center">
      <Image
        src="/images/logo.png"
        width={70}
        height={70}
        sizes="70px"
        style={{ width: '70px', height: '70px' }} // Fixes the image dimension warning
        className="bg-gray-800 rounded-2xl"
        alt="DevSpace Logo" // Added mandatory alt tag for accessibility
      />

      <h1 className="text-6xl my-5 font-bold">Whoops!</h1>

      <h2 className="text-4xl text-gray-500 dark:text-gray-400 mb-8">
        This page does not exist
      </h2>

      <Link
        href="/"
        className="text-indigo-500 hover:text-indigo-600 dark:hover:text-indigo-400 font-medium underline underline-offset-4"
      >
        Go Back Home
      </Link>
    </div>
  );
}
