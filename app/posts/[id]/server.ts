"use server";

import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { db } from "~/server/db";
import * as s from "~/server/db/schema";

export const getPost = async ({ id }: { id: string }) => {
  return await db.query.posts.findFirst({
    where: (fields, { eq }) => eq(fields.id, id),
  });
};

export const getPostsIds = async () => {
  return await db.query.posts.findMany({
    columns: { id: true },
  });
};

export const deletePost = async ({ id }: { id: string }) => {
  await db.delete(s.posts).where(eq(s.posts.id, id));

  revalidatePath("/posts");
  revalidatePath(`/posts/${id}`);
};
