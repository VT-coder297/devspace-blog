'use client';

import Post from './Post';
import { BlogPost } from '@/lib/posts';

interface SearchResultsProps {
  results: BlogPost[];
  setSearchTerm: (term: string) => void;
}

export default function SearchResults({
  results,
  setSearchTerm,
}: SearchResultsProps) {
  if (results.length === 0) return null;

  return (
    /* 
      FIX: Swapped 'md:w-6/12' for a structural explicit width block ('md:w-[500px]').
      Added 'right-0' and 'md:right-0' to snap the box edges clean with the search input bar field.
    */
    <div className="absolute top-14 right-0 z-50 w-full sm:w-[450px] md:w-[500px] bg-white dark:bg-gray-800 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 max-h-[480px] overflow-y-auto transition-all duration-200">
      <div className="p-5">
        {/* Dropdown Title Header Panel */}
        <div className="flex items-center justify-between border-b pb-3 mb-3 border-gray-100 dark:border-gray-700">
          <h2 className="text-lg font-bold text-gray-900 dark:text-white">
            {results.length} {results.length === 1 ? 'Result' : 'Results'}
          </h2>
          <button
            onClick={() => setSearchTerm('')}
            className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline cursor-pointer"
          >
            Clear Results
          </button>
        </div>

        {/* Dense content grid container */}
        <div
          className="grid grid-cols-1 gap-3"
          onClick={() => setSearchTerm('')}
        >
          {results.map((result, index) => (
            <Post key={index} post={result} compact={true} />
          ))}
        </div>
      </div>
    </div>
  );
}
