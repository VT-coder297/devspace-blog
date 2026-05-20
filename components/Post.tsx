import Link from 'next/link';
import Image from 'next/image';
import CategoryLabel from './CategoryLabel';
import { BlogPost } from '../lib/posts';

export interface PostProps {
  post: BlogPost;
  compact?: boolean; // 1. Optional boolean flag to support search dropdown sizing
}

export default function Post({ post, compact = false }: PostProps) {
  return (
    <div className="w-full bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden border border-gray-100 dark:border-gray-700 flex flex-col justify-between">
      <div>
        {/* 2. Hide the heavy cover image if compact mode is active */}
        {!compact && post.frontmatter.cover_image && (
          <div className="relative w-full h-48 bg-gray-100 dark:bg-gray-900">
            <Image
              src={post.frontmatter.cover_image}
              alt={post.frontmatter.title}
              fill
              sizes="(max-width: 768px) 100vw, 33vw"
              className="object-cover"
            />
          </div>
        )}

        <div className="p-6">
          {/* Date and Category Badge Layout */}
          <div className="flex justify-between items-center mb-3">
            <span className="text-sm text-gray-500 dark:text-gray-400">
              {post.frontmatter.date}
            </span>
            <CategoryLabel>{post.frontmatter.category}</CategoryLabel>
          </div>

          {/* Title Element */}
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2 line-clamp-2 hover:text-indigo-600 dark:hover:text-indigo-400 transition">
            <Link href={`/blog/${post.slug}`}>{post.frontmatter.title}</Link>
          </h3>

          {/* 3. Hide the excerpt descriptive text if compact mode is active */}
          {!compact && (
            <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-3">
              {post.frontmatter.excerpt}
            </p>
          )}
        </div>
      </div>

      {/* 4. Hide the entire card footer profile block if compact mode is active */}
      {!compact && (
        <div className="p-6 pt-1 border-t border-gray-100 dark:border-gray-700 flex justify-between items-center mt-auto">
          <Link
            href={`/blog/${post.slug}`}
            className="text-indigo-500 hover:text-indigo-600 dark:hover:text-indigo-400 font-medium text-sm transition"
          >
            Read More →
          </Link>

          <div className="flex items-center gap-3">
            {post.frontmatter.author_image && (
              <div className="relative w-8 h-8 rounded-full overflow-hidden border border-gray-200 dark:border-gray-600 bg-gray-100">
                <Image
                  src={post.frontmatter.author_image}
                  alt={post.frontmatter.author}
                  fill
                  sizes="32px"
                  className="object-cover"
                />
              </div>
            )}
            <span className="text-xs font-medium text-gray-700 dark:text-gray-300">
              {post.frontmatter.author}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
