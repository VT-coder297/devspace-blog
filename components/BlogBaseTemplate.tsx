import Post from '@/components/Post';
import CategoryList from '@/components/CategoryList';
import Pagination from '@/components/Pagination';

// 1. Explicitly recreate or import your BlogPost item architecture
interface BlogPost {
  slug: string;
  frontmatter: {
    title: string;
    date: string;
    excerpt: string;
    cover_image: string;
    category: string;
    author: string;
    author_image: string;
  };
}

interface BlogBaseTemplateProps {
  title: string;
  orderedPosts: BlogPost[]; // 2. Replaced 'any[]' with your explicit post model interface
  currentPage: number;
  numPages: number;
  uniqueCategories: string[];
}

export default function BlogBaseTemplate({
  title,
  orderedPosts,
  currentPage,
  numPages,
  uniqueCategories,
}: BlogBaseTemplateProps) {
  return (
    <div className="flex justify-between flex-col md:flex-row gap-6">
      <div className="w-full md:w-3/4">
        <h1 className="text-5xl border-b-4 pb-4 font-bold text-gray-900 dark:text-white">
          {title}
        </h1>
        {orderedPosts.length === 0 ? (
          <p className="text-gray-500 mt-10 text-xl text-center">
            No posts found.
          </p>
        ) : (
          <>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 mt-6">
              {orderedPosts.map((post, index) => (
                <Post key={index} post={post} />
              ))}
            </div>
            <Pagination currentPage={currentPage} numPages={numPages} />
          </>
        )}
      </div>
      <div className="w-full md:w-1/4">
        <CategoryList categories={uniqueCategories} />
      </div>
    </div>
  );
}
