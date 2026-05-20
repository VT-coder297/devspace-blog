import Link from 'next/link';
import Image from 'next/image';
import Search from './Search';
import ThemeToggle from './ThemeToggle'; // Import your new theme toggle button

export default function Header() {
  return (
    <header className="bg-gray-900 text-gray-100 shadow w-full">
      <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center justify-between gap-4 md:gap-0">
        <Link
          href="/"
          className="flex md:w-1/5 title-font font-medium items-center md:justify-start"
        >
          <Image
            src="/images/logo.png"
            width={40}
            height={40}
            sizes="40px"
            style={{ width: '40px', height: '40px' }}
            alt="logo"
            priority
          />
          <span className="ml-3 text-xl font-bold tracking-tight text-white">
            DevSpace
          </span>
        </Link>

        <div className="w-full md:w-auto flex-grow md:flex-grow-0 order-3 md:order-2 my-2 md:my-0">
          <Search />
        </div>

        <nav className="flex flex-wrap md:w-auto items-center justify-end text-base order-2 md:order-3 gap-2">
          <Link
            href="/blog"
            className="mx-3 uppercase hover:text-indigo-300 transition"
          >
            Blog
          </Link>
          <Link
            href="/about"
            className="mx-3 uppercase hover:text-indigo-300 transition"
          >
            About
          </Link>

          {/* Theme switcher control toggle switch aligned inside layout element row */}
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
}
