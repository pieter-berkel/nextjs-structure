"use server";

import { db } from "~/server/db";
import * as s from "~/server/db/schema";
import { z } from "zod";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { editPostSchema } from "./validations";

export type EditPostValues = z.infer<typeof editPostSchema>;

export const editPost = async (values: any) => {
  const { id, ...data } = editPostSchema.parse(values);
  await db.update(s.posts).set(data).where(eq(s.posts.id, id));
  revalidatePath(`/posts`);
};
