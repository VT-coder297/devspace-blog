import Link from 'next/link';

interface PaginationProps {
  currentPage: number;
  numPages: number;
}

export default function Pagination({ currentPage, numPages }: PaginationProps) {
  const isFirst = currentPage === 1;
  const isLast = currentPage === numPages;
  const prevPage = `/blog/page/${currentPage - 1}`;
  const nextPage = `/blog/page/${currentPage + 1}`;

  // If there is only 1 page of content, don't show pagination structural lines at all
  if (numPages <= 1) return null;

  return (
    <div className="mt-8">
      <ul className="flex items-center gap-1 list-none pl-0 my-2">
        {/* Previous Button Container */}
        {!isFirst && (
          <li>
            <Link
              href={prevPage}
              className="relative block py-2 px-4 text-sm font-medium transition rounded border border-gray-300 bg-white text-gray-800 hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700"
            >
              Previous
            </Link>
          </li>
        )}

        {/* Individual Number Buttons Mapping */}
        {Array.from({ length: numPages }, (_, i) => {
          const pageNum = i + 1;
          const isActive = currentPage === pageNum;

          return (
            <li key={`page-${pageNum}`}>
              <Link
                href={`/blog/page/${pageNum}`}
                className={`relative block py-2 px-4 text-sm font-medium transition rounded border ${
                  isActive
                    ? 'border-indigo-600 bg-indigo-600 text-white hover:bg-indigo-700 dark:border-indigo-500 dark:bg-indigo-500'
                    : 'border-gray-300 bg-white text-gray-800 hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700'
                }`}
              >
                {pageNum}
              </Link>
            </li>
          );
        })}

        {/* Next Button Container */}
        {!isLast && (
          <li>
            <Link
              href={nextPage}
              className="relative block py-2 px-4 text-sm font-medium transition rounded border border-gray-300 bg-white text-gray-800 hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700"
            >
              Next
            </Link>
          </li>
        )}
      </ul>
    </div>
  );
}
