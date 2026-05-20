import { BlogPost } from '../lib/posts';

/**
 * Sorts markdown blog posts by their frontmatter date layout.
 * Newest articles are shifted to the top of the array list.
 */
export const sortByDate = (a: BlogPost, b: BlogPost): number => {
  // Convert date strings into timestamps for safe mathematical comparison
  const dateA = new Date(a.frontmatter.date).getTime();
  const dateB = new Date(b.frontmatter.date).getTime();

  // Sorts in descending order (Newest articles first)
  return dateB - dateA;
};
