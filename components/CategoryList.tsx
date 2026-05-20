import Link from 'next/link';

interface CategoryListProps {
  categories: string[];
}

export default function CategoryList({ categories }: CategoryListProps) {
  return (
    <div className="w-full p-5 bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-100 dark:border-gray-700 mt-6">
      <h3 className="text-xl font-bold bg-gray-900 text-white dark:bg-gray-900/50 p-3 rounded">
        Blog Categories
      </h3>

      <ul className="divide-y divide-gray-200 dark:divide-gray-700 mt-4">
        {categories.map((category, index) => (
          <li key={index}>
            {/* The Link tag is now correctly nested inside the list item */}
            <Link
              href={`/blog/category/${category.toLowerCase()}`}
              className="block p-4 font-medium text-gray-700 dark:text-gray-300 transition duration-200 hover:bg-gray-50 dark:hover:bg-gray-700/50 hover:text-indigo-600 dark:hover:text-indigo-400"
            >
              {category}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
