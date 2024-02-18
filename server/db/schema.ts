import { sql } from "drizzle-orm";
import { integer, sqliteTable as table, text } from "drizzle-orm/sqlite-core";
import { nanoid } from "nanoid";

export const posts = table("pages", {
  id: text("id", { length: 36 })
    .primaryKey()
    .$defaultFn(() => nanoid()),
  name: text("name").notNull(),
});

export const files = table("files", {
  id: integer("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
  url: text("url").notNull(),
  name: text("name").notNull(),
  ext: text("ext"),
  size: integer("size").notNull(),
  isTemporary: integer("is_temporary", { mode: "boolean" })
    .notNull()
    .default(false),
  isConfirmed: integer("is_confirmed", { mode: "boolean" })
    .notNull()
    .default(false),
  createdAt: text("created_at")
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),
});
