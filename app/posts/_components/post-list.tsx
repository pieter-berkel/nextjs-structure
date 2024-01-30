import { getPosts } from "../server";
import { PostItem } from "./post-item";

export async function PostList({ page = 1 }: { page?: number }) {
  const posts = await getPosts({ page });

  return (
    <div className="flex flex-col gap-4">
      {posts.map((post) => (
        <PostItem key={post.id} post={post} />
      ))}
    </div>
  );
}
