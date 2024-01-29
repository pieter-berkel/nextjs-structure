import { notFound } from "next/navigation";
import { EditPostForm } from "./_components/edit-post-form";
import { db } from "~/server/db";

const getPost = async (id: string) => {
  return await db.query.posts.findFirst({
    where: (fields, { eq }) => eq(fields.id, id),
  });
};

export default async function Page({ params }: { params: { id: string } }) {
  const post = await getPost(params.id);

  if (!post) {
    return notFound();
  }

  return (
    <main className="flex flex-col gap-8 p-20">
      <EditPostForm post={post} />
    </main>
  );
}
