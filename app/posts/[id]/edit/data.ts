import { db } from "~/server/db";

export const getPost = async ({ id }: { id: string }) => {
  return await db.query.posts.findFirst({
    where: (fields, { eq }) => eq(fields.id, id),
  });
};
