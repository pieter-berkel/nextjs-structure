import Link from "next/link";
import { notFound } from "next/navigation";
import { buttonVariants } from "~/components/ui/button";
import { DeletePostButton } from "./_components/delete-post-button";
import { getPost } from "./server";

// export async function generateStaticParams() {
//   const posts = await getPostsIds();

//   return posts.map((post) => ({
//     id: post.id,
//   }));
// }

export async function generateMetadata({ params }: { params: { id: string } }) {
  const post = await getPost({ id: params.id });

  if (!post) {
    return {};
  }

  return {
    title: post.name,
  };
}

export default async function Page({ params }: { params: { id: string } }) {
  const post = await getPost({ id: params.id });

  if (!post) {
    return notFound();
  }

  return (
    <main className="flex flex-col gap-8 p-20">
      <div className="flex items-center justify-between">
        <h1 className="font-bold text-2xl">{post.name}</h1>
        <div className="flex items-center gap-4">
          <Link href={`/posts/${post.id}/edit`} className={buttonVariants()}>
            Wijzigen
          </Link>
          <DeletePostButton id={post.id} />
        </div>
      </div>
    </main>
  );
}
