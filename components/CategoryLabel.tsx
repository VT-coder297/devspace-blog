import Link from 'next/link';

// 1. Explicitly list your allowed category keys for TypeScript safety
type Category = 'JavaScript' | 'CSS' | 'Python' | 'PHP' | 'Ruby';

interface CategoryLabelProps {
  children: Category | string; // Fallback to string if a new category is added
}

export default function CategoryLabel({ children }: CategoryLabelProps) {
  // 2. Map full Tailwind utility classes directly instead of piecing strings together
  const colorClasses: Record<string, string> = {
    JavaScript: 'bg-yellow-600 text-gray-900', // Yellow looks better with dark text
    CSS: 'bg-blue-600 text-white',
    Python: 'bg-green-600 text-white',
    PHP: 'bg-purple-600 text-white',
    Ruby: 'bg-red-600 text-white',
  };

  // Fallback to a neutral slate gray if the category doesn't match our list
  const activeClass = colorClasses[children] || 'bg-slate-600 text-white';

  return (
    <div
      className={`px-2 py-1 font-bold rounded text-xs inline-block ${activeClass}`}
    >
      <Link href={`/blog/category/${children.toString().toLowerCase()}`}>
        {children}
      </Link>
    </div>
  );
}
