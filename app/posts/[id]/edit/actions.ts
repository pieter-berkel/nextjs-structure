"use server";

import { db } from "~/server/db";
import { z } from "zod";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { postSchema, posts } from "~/server/db/schema/posts";

export type EditPostValues = z.infer<typeof postSchema>;

export const editPost = async (values: any) => {
  const { id, ...data } = postSchema.parse(values);
  await db.update(posts).set(data).where(eq(posts.id, id));
  revalidatePath(`/posts`);
};
