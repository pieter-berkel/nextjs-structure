import { Suspense } from "react";
import { PostList, PostListSkeleton } from "./components/post-list";
import { Paginator } from "~/components/paginator";
import { getPostPages } from "./server";
import Link from "next/link";
import { buttonVariants } from "~/components/ui/button";

export default async function Page({
  searchParams,
}: {
  searchParams?: { page?: string };
}) {
  const page = Number(searchParams?.page) || 1;
  const postPages = await getPostPages();

  return (
    <main className="flex flex-col gap-8 p-20">
      <div className="flex items-center justify-between">
        <h1 className="font-bold text-2xl">Posts</h1>
        <Link href="/posts/create" className={buttonVariants()}>
          Post toevoegen
        </Link>
      </div>
      <Suspense key={`postlist-${page}`} fallback={<PostListSkeleton />}>
        <PostList page={page} />
      </Suspense>
      <Paginator count={postPages} />
    </main>
  );
}
