import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import BlogBaseTemplate from '@/components/BlogBaseTemplate';
import { getPosts } from '@/lib/posts';

interface CategoryPageProps {
  params: Promise<{
    category_name: string;
  }>;
}

// 1. Replaces getStaticPaths: Pre-renders all valid category routes at build time [No_Url]
export async function generateStaticParams() {
  const postsDirectory = path.join(process.cwd(), 'posts');

  if (!fs.existsSync(postsDirectory)) return [];

  const files = fs.readdirSync(postsDirectory);

  const categories = files.map((filename) => {
    const markdownWithMeta = fs.readFileSync(
      path.join(postsDirectory, filename),
      'utf-8',
    );
    const { data: frontmatter } = matter(markdownWithMeta);
    return frontmatter.category.toLowerCase();
  });

  // Create a unique array of lowercase category strings
  const uniqueCategories = Array.from(new Set(categories));

  return uniqueCategories.map((category) => ({
    category_name: category,
  }));
}

// 2. Dynamic SEO Metadata Generator
export async function generateMetadata({ params }: CategoryPageProps) {
  const { category_name } = await params;
  // Capitalize the first letter for the browser tab title
  const formattedTitle =
    category_name.charAt(0).toUpperCase() + category_name.slice(1);

  return {
    title: `${formattedTitle} Articles | DevSpace`,
    description: `Read all of our latest tutorials and news regarding ${formattedTitle}.`,
  };
}

// 3. Main Static Server Component
export default async function CategoryBlogPage({ params }: CategoryPageProps) {
  // Await the asynchronous route parameters to avoid hydration warnings
  const { category_name } = await params;

  const allPosts = getPosts();

  // Extract a list of unique category tags for the sidebar content
  const categories = allPosts.map((post) => post.frontmatter.category);
  const uniqueCategories = Array.from(new Set(categories));

  // Filter posts by checking if their frontmatter category string matches the URL parameter
  const categoryPosts = allPosts.filter(
    (post) =>
      post.frontmatter.category.toLowerCase() === category_name.toLowerCase(),
  );

  // Capitalize title for heading rendering visibility
  const formattedCategoryName =
    category_name.charAt(0).toUpperCase() + category_name.slice(1);

  return (
    <BlogBaseTemplate
      title={`Posts in ${formattedCategoryName}`}
      orderedPosts={categoryPosts}
      currentPage={1}
      numPages={1} // Static single-view container for specific filtered items
      uniqueCategories={uniqueCategories}
    />
  );
}
