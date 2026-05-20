import { NextRequest, NextResponse } from 'next/server';
import { getPosts } from '@/lib/posts';

// 1. Explicitly export an async GET method matching Next.js standards
export async function GET(request: NextRequest) {
  try {
    // 2. Extract search query parameters using the native URL Web API
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('q')?.toLowerCase() || '';

    // If the query parameter is missing or empty, return an empty array instantly
    if (!query.trim()) {
      return NextResponse.json({ results: [] });
    }

    // 3. Fetch all compiled markdown posts using your bulletproof getPosts script
    const allPosts = getPosts();

    // 4. Filter the records safely by checking title, excerpt, and category matches
    const filteredResults = allPosts.filter(({ frontmatter }) => {
      const titleMatch = frontmatter.title?.toLowerCase().includes(query);
      const excerptMatch = frontmatter.excerpt?.toLowerCase().includes(query);
      const categoryMatch = frontmatter.category?.toLowerCase().includes(query);

      return titleMatch || excerptMatch || categoryMatch;
    });

    // 5. Return a standard type-safe JSON response structure
    return NextResponse.json({ results: filteredResults });
  } catch (error) {
    console.error('Error executing backend markdown search lookup:', error);
    return NextResponse.json(
      { error: 'Internal Server Error processing request' },
      { status: 500 },
    );
  }
}
