import { sqliteTable as table, text } from "drizzle-orm/sqlite-core";
import { nanoid } from "nanoid";
import { z } from "zod";

export const posts = table("posts", {
  id: text("id", { length: 36 })
    .primaryKey()
    .$defaultFn(() => nanoid()),
  name: text("name").notNull(),
});

export const postSchema = z.object({
  id: z.string(),
  name: z.string(),
});
