import Link from 'next/link';
import Post from '@/components/Post';
import { getPosts } from '@/lib/posts';

export default function HomePage() {
  // Fetch your posts directly inside the server component (Replaces getStaticProps)
  const posts = getPosts().slice(0, 6);
  // console.log(posts);

  return (
    <div>
      <h1 className="text-5xl border-b-4 p-5 font-bold">Latest Posts</h1>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 mt-6">
        {posts.map((post, index) => (
          <Post key={index} post={post} />
        ))}
      </div>

      <Link
        href="/blog"
        className="block text-center border border-gray-900 text-gray-900 dark:text-gray-900 rounded-md py-4 my-5 transition duration-500 ease select-none hover:text-white hover:bg-gray-900 dark:hover:bg-gray-700 focus:outline-none focus:shadow-outline w-full font-medium"
      >
        All Posts
      </Link>
    </div>
  );
}
