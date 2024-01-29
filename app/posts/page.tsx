import { Suspense } from "react";
import { PostList, PostListSkeleton } from "./post-list";
import { Paginator } from "~/components/paginator";
import { getPostPages } from "./data";

export default async function Page({
  searchParams,
}: {
  searchParams?: { page?: string };
}) {
  const page = Number(searchParams?.page) || 1;
  const postPages = await getPostPages();

  return (
    <main className="flex flex-col gap-8 p-20">
      <h1 className="font-bold text-2xl">Posts</h1>
      <Suspense key={`postlist-${page}`} fallback={<PostListSkeleton />}>
        <PostList page={page} />
      </Suspense>
      <Paginator count={postPages} />
    </main>
  );
}
