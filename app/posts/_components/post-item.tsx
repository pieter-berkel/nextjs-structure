import Link from "next/link";
import { getPosts } from "../server";

type PostItemProps = {
  post: Awaited<ReturnType<typeof getPosts>>[number];
};

export const PostItem = ({ post }: PostItemProps) => {
  return (
    <Link href={`/posts/${post.id}`}>
      <div className="h-12 flex items-center justify-center rounded-lg bg-gray-100 text-black">
        {post.name}
      </div>
    </Link>
  );
};
