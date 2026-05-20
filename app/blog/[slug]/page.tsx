import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { marked } from 'marked'; // Destructured import for modern marked syntax
import Link from 'next/link';
import Image from 'next/image';
import CategoryLabel from '../../../components/CategoryLabel'; // Adjusted paths to use reliable relative lookups

interface PostPageProps {
  params: Promise<{
    slug: string;
  }>;
}

// 1. Replaces getStaticPaths: pre-renders all blog slugs at build time
export async function generateStaticParams() {
  const postsDirectory = path.join(process.cwd(), 'posts');

  if (!fs.existsSync(postsDirectory)) return [];

  const files = fs.readdirSync(postsDirectory);

  return files.map((filename) => ({
    slug: filename.replace('.md', ''),
  }));
}

// 2. Dynamic SEO Metadata Loader
export async function generateMetadata({ params }: PostPageProps) {
  const { slug } = await params;

  const postsDirectory = path.join(process.cwd(), 'posts');
  const markdownWithMeta = fs.readFileSync(
    path.join(postsDirectory, `${slug}.md`),
    'utf-8',
  );
  const { data: frontmatter } = matter(markdownWithMeta);

  return {
    title: `${frontmatter.title} | DevSpace`,
    description: frontmatter.excerpt || 'Read this post on DevSpace',
  };
}

// 3. Main Server Component Page Layout
export default async function PostPage({ params }: PostPageProps) {
  // Await the dynamic parameters array to comply with modern Next.js request handling
  const { slug } = await params;

  const postsDirectory = path.join(process.cwd(), 'posts');
  const markdownWithMeta = fs.readFileSync(
    path.join(postsDirectory, `${slug}.md`),
    'utf-8',
  );
  const { data: frontmatter, content } = matter(markdownWithMeta);

  // Parse markdown safely into an HTML text fragment using modern marked syntax
  const htmlContent = await marked.parse(content);

  return (
    <div>
      <Link
        href="/blog"
        className="text-indigo-500 hover:text-indigo-600 font-medium inline-block mb-4"
      >
        ← Go Back
      </Link>

      <div className="w-full px-10 py-6 bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-lg shadow-md mt-2">
        <div className="flex justify-between items-center flex-wrap gap-4 mt-4 mb-7">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white">
            {frontmatter.title}
          </h1>
          <CategoryLabel>{frontmatter.category}</CategoryLabel>
        </div>

        {/* Cover Image Wrapper */}
        <div className="relative w-full h-96 bg-gray-100 dark:bg-gray-900 rounded-lg overflow-hidden mb-8">
          <Image
            src={frontmatter.cover_image}
            alt={frontmatter.title}
            fill
            sizes="100vw"
            className="object-cover"
          />
        </div>

        {/* Author Bio Bar */}
        <div className="flex justify-between items-center bg-gray-50 dark:bg-gray-900 p-4 rounded-lg my-8 border border-gray-100 dark:border-gray-800">
          <div className="flex items-center gap-3">
            <div className="relative w-10 h-10 rounded-full overflow-hidden border border-gray-200 dark:border-gray-700 bg-gray-200">
              <Image
                src={frontmatter.author_image}
                alt={frontmatter.author}
                fill
                sizes="40px"
                className="object-cover"
              />
            </div>
            <h4 className="font-semibold text-gray-800 dark:text-gray-200">
              {frontmatter.author}
            </h4>
          </div>
          <div className="text-sm text-gray-500 dark:text-gray-400 font-medium">
            {frontmatter.date}
          </div>
        </div>

        {/* Rendered HTML Post Content */}
        <div className="mt-2 prose max-w-none dark:prose-invert text-gray-800 dark:text-gray-200 leading-relaxed">
          <div dangerouslySetInnerHTML={{ __html: htmlContent }}></div>
        </div>
      </div>
    </div>
  );
}
