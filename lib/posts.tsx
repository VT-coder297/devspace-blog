import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { sortByDate } from '../utils/index';

export interface BlogPost {
  slug: string;
  frontmatter: {
    title: string;
    date: string;
    excerpt: string;
    cover_image: string;
    category: string;
    author: string;
    author_image: string;
    [key: string]: unknown;
  };
}

export function getPosts(): BlogPost[] {
  const postsDirectory = path.join(process.cwd(), 'posts');
  if (!fs.existsSync(postsDirectory)) {
    return [];
  }

  const files = fs.readdirSync(postsDirectory);

  const posts = files
    // 1. CRITICAL ADDITION: Only load true markdown records to avoid system hidden file crashes
    .filter((filename) => filename.endsWith('.md'))
    .map((filename) => {
      const slug = filename.replace('.md', '');
      const markdownWithMeta = fs.readFileSync(
        path.join(postsDirectory, filename),
        'utf-8',
      );
      const { data } = matter(markdownWithMeta);

      return {
        slug,
        frontmatter: data as BlogPost['frontmatter'],
      };
    });

  return posts.sort(sortByDate);
}
