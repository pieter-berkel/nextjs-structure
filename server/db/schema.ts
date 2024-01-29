import { sqliteTable as table, text } from "drizzle-orm/sqlite-core";
import { nanoid } from "nanoid";

export const posts = table("pages", {
  id: text("id", { length: 36 })
    .primaryKey()
    .$defaultFn(() => nanoid()),
  name: text("name").notNull(),
});
