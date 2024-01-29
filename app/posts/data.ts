import { sql } from "drizzle-orm";
import { db } from "~/server/db";
import { posts } from "~/server/db/schema/posts";

const limit = 5;

export const getPostPages = async () => {
  const result = await db
    .select({
      count: sql`COUNT(*)`.mapWith(Number).as("count"),
    })
    .from(posts);

  return Math.ceil(result[0].count / limit);
};

export const getPosts = async ({ page }: { page: number }) => {
  return await db.query.posts.findMany({
    limit,
    offset: (page - 1) * limit,
  });
};
