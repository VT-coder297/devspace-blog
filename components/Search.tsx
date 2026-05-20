'use client'; // 1. CRITICAL: Registers this component for Client-Side execution

import { useState, useEffect, FormEvent } from 'react';
import { FaSearch } from 'react-icons/fa';
import SearchResults from './SearchResults';
import { BlogPost } from '@/lib/posts'; // Reusing your type schema

export default function Search() {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [searchResults, setSearchResults] = useState<BlogPost[]>([]);

  useEffect(() => {
    // 2. Debounce mechanism: Wait 300ms after the user stops typing to fetch results
    const delayDebounceFn = setTimeout(async () => {
      if (searchTerm.trim() === '') {
        setSearchResults([]);
        return;
      }

      try {
        const res = await fetch(
          `/api/search?q=${encodeURIComponent(searchTerm)}`,
        );
        if (!res.ok) throw new Error('Search failed');

        const { results } = await res.json();
        setSearchResults(results || []);
      } catch (error) {
        console.error('Failed to retrieve search queries:', error);
        setSearchResults([]);
      }
    }, 300);

    // Clean up timeout if the user presses another key within 300ms
    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm]);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevents the browser from reloading the entire page
  };

  return (
    <div className="relative bg-gray-600 p-4 dark:bg-gray-900 transition-colors duration-200">
      <div className="container mx-auto flex items-center justify-center md:justify-end">
        <div className="relative text-gray-600 w-72">
          <form onSubmit={handleSubmit}>
            <input
              type="search"
              name="search"
              id="search"
              className="bg-white h-10 px-5 pr-10 rounded-full text-sm focus:outline-none w-72 text-gray-900 border border-transparent focus:border-indigo-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search Posts..."
              autoComplete="off"
            />
            <FaSearch className="absolute top-0 right-0 text-gray-500 mt-3 mr-4 pointer-events-none" />
          </form>
        </div>
      </div>

      {/* Dynamic results layout dropdown menu rendering visibility */}
      <SearchResults results={searchResults} setSearchTerm={setSearchTerm} />
    </div>
  );
}
