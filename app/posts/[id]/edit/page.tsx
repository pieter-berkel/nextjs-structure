import { notFound } from "next/navigation";
import { getPost } from "./data";
import { EditPostForm } from "./_components/edit-post-form";

export default async function Page({ params }: { params: { id: string } }) {
  const post = await getPost({ id: params.id });

  if (!post) {
    return notFound();
  }

  return (
    <main className="flex flex-col gap-8 p-20">
      <EditPostForm post={post} />
    </main>
  );
}
