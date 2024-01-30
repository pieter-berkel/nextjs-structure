import Link from "next/link";
import { getPosts } from "../server";

export async function PostList({ page = 1 }: { page?: number }) {
  const posts = await getPosts({ page });

  return (
    <div className="flex flex-col gap-4">
      {posts.map((post) => (
        <Link key={post.id} href={`/posts/${post.id}/edit`}>
          <div className="h-12 flex items-center justify-center rounded-lg bg-gray-100 text-black">
            {post.name}
          </div>
        </Link>
      ))}
    </div>
  );
}

export function PostListSkeleton({ length = 5 }: { length?: number }) {
  return (
    <div className="flex flex-col gap-4">
      {Array.from({ length }).map((_, i) => (
        <div key={i} className="h-12 bg-slate-700 animate-pulse rounded-lg" />
      ))}
    </div>
  );
}
