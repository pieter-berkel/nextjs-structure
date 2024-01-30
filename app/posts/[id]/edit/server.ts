"use server";

import { db } from "~/server/db";
import * as s from "~/server/db/schema";
import { z } from "zod";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

const editPostSchema = z.object({
  id: z.string(),
  name: z.string(),
});

export const editPost = async (values: unknown) => {
  const { id, ...data } = editPostSchema.parse(values);
  await db.update(s.posts).set(data).where(eq(s.posts.id, id));
  revalidatePath(`/posts`);
};

export const getPost = async ({ id }: { id: string }) => {
  return await db.query.posts.findFirst({
    where: (fields, { eq }) => eq(fields.id, id),
  });
};
