import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Header from '@/components/Header';
import ThemeProvider from '@/components/ThemeProvider'; // 1. Import your theme provider wrapper
import '@/app/globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'DevSpace Blog',
  description: 'The best development tutorials and articles.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // suppressHydrationWarning is recommended by next-themes to ignore class changes on the html tag
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.className} bg-gray-50 text-gray-900 dark:bg-gray-900 dark:text-gray-100 min-h-screen flex flex-col transition-colors duration-200`}
      >
        {/* 2. Wrap your application body with the theme context */}
        <ThemeProvider>
          <Header />
          <main className="container mx-auto flex-grow p-6 md:p-10 max-w-7xl">
            {children}
          </main>
          <footer className="border-t border-gray-200 dark:border-gray-800 text-center py-6 text-sm text-gray-500">
            &copy; {new Date().getFullYear()} DevSpace. All rights reserved.
          </footer>
        </ThemeProvider>
      </body>
    </html>
  );
}
