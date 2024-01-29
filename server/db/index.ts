import Database from "better-sqlite3";
import { drizzle } from "drizzle-orm/better-sqlite3";

import * as schema from "~/server/db/schema";

const sqlite = new Database(process.env.DATABASE_URL as string);

export const db = drizzle(sqlite, {
  schema,
});
