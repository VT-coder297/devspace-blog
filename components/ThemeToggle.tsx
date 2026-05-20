'use client';

import { useTheme } from 'next-themes';
import { useSyncExternalStore } from 'react';
import { FaSun, FaMoon } from 'react-icons/fa';

// Helper subscription functions required by useSyncExternalStore [No_Url]
const subscribe = () => () => {};
const getSnapshot = () => true; // Client snapshot returns true [No_Url]
const getServerSnapshot = () => false; // Server snapshot returns false [No_Url]

export default function ThemeToggle() {
  const { setTheme, resolvedTheme } = useTheme();

  /* 
    FIX: Replaced useEffect + useState with useSyncExternalStore [No_Url].
    This tells React whether it's executing on the client or server instantly,
    satisfies your strict linter rules, and prevents hydration mismatches [No_Url].
  */
  const isMounted = useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot,
  );

  // If we are rendering on the server, display an empty placeholder block to prevent layout shifts
  if (!isMounted) {
    return <div className="w-9 h-9" />;
  }

  const isDark = resolvedTheme === 'dark';

  return (
    <button
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      className="p-2.5 rounded-full border border-gray-200 dark:border-gray-700 bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-200 cursor-pointer flex items-center justify-center shadow-sm"
      aria-label="Toggle Dark Mode Theme View"
    >
      {isDark ? (
        <FaSun className="w-4 h-4 text-amber-400" />
      ) : (
        <FaMoon className="w-4 h-4 text-indigo-600" />
      )}
    </button>
  );
}
