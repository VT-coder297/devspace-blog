import BlogBaseTemplate from '@/components/BlogBaseTemplate';
import { getPosts } from '@/lib/posts';
import { POSTS_PER_PAGE } from '@/config/index';
import fs from 'fs';
import path from 'path';

interface BlogPageProps {
  params: Promise<{ page_index: string }>;
}

export async function generateStaticParams() {
  const files = fs.readdirSync(path.join(process.cwd(), 'posts'));
  const numPages = Math.ceil(files.length / POSTS_PER_PAGE);
  return Array.from({ length: numPages }, (_, i) => ({
    page_index: (i + 1).toString(),
  }));
}

export default async function BlogPage({ params }: BlogPageProps) {
  const { page_index } = await params;
  const currentPage = parseInt(page_index || '1');
  const allPosts = getPosts();

  const numPages = Math.ceil(allPosts.length / POSTS_PER_PAGE);
  const categories = allPosts.map((post) => post.frontmatter.category);

  return (
    <BlogBaseTemplate
      title="Blog"
      orderedPosts={allPosts.slice(
        (currentPage - 1) * POSTS_PER_PAGE,
        currentPage * POSTS_PER_PAGE,
      )}
      currentPage={currentPage}
      numPages={numPages}
      uniqueCategories={Array.from(new Set(categories))}
    />
  );
}
