import { Metadata } from 'next';

// This replaces title='About DevSpace' from your old layout props
export const metadata: Metadata = {
  title: 'About DevSpace',
};

export default function AboutPage() {
  return (
    <div>
      <h1 className="text-5xl border-b-4 pb-5 font-bold">About</h1>

      <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg px-10 py-6 mt-6 border border-gray-100 dark:border-gray-700">
        <h3 className="text-2xl mb-5 font-semibold text-gray-900 dark:text-white">
          DevSpace Blog
        </h3>
        <p className="mb-3 text-gray-600 dark:text-gray-300">
          This is a blog built with Next.js and Markdown
        </p>
        <p className="text-gray-700 dark:text-gray-400">
          Version{' '}
          <span className="font-bold text-gray-900 dark:text-white">1.0.0</span>
        </p>
      </div>
    </div>
  );
}
