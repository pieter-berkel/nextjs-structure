"use server";

import { db } from "~/server/db";
import * as s from "~/server/db/schema";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const createPostSchema = z.object({
  name: z.string(),
});

export type CreatePostValues = z.infer<typeof createPostSchema>;

export const createPost = async (values: CreatePostValues) => {
  const data = createPostSchema.parse(values);
  await db.insert(s.posts).values(data);
  revalidatePath("/posts");
};
