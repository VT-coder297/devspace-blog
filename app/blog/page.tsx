import BlogBaseTemplate from '@/components/BlogBaseTemplate';
import { getPosts } from '@/lib/posts';
import { POSTS_PER_PAGE } from '@/config/index';

export const metadata = { title: 'DevSpace Articles Archive' };

export default function BlogArchivePage() {
  const allPosts = getPosts();
  const numPages = Math.ceil(allPosts.length / POSTS_PER_PAGE);
  const categories = allPosts.map((post) => post.frontmatter.category);

  return (
    <BlogBaseTemplate
      title="All Blog Posts"
      orderedPosts={allPosts.slice(0, POSTS_PER_PAGE)}
      currentPage={1}
      numPages={numPages}
      uniqueCategories={Array.from(new Set(categories))}
    />
  );
}
