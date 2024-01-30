import { sql } from "drizzle-orm";
import { db } from "~/server/db";
import * as s from "~/server/db/schema";

const limit = 5;

export const getPostPages = async () => {
  const result = await db
    .select({
      count: sql`COUNT(*)`.mapWith(Number).as("count"),
    })
    .from(s.posts);

  return Math.ceil(result[0].count / limit);
};

export const getPosts = async ({ page }: { page: number }) => {
  return await db.query.posts.findMany({
    limit,
    offset: (page - 1) * limit,
  });
};
