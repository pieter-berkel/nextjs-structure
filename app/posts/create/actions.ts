"use server";

import { db } from "~/server/db";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { postSchema, posts } from "~/server/db/schema/posts";

const createPostSchema = postSchema.omit({ id: true });
export type CreatePostValues = z.infer<typeof createPostSchema>;

export const createPost = async (values: CreatePostValues) => {
  const data = createPostSchema.parse(values);
  await db.insert(posts).values(data);
  revalidatePath("/posts");
};
