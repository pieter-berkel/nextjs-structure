import { type Config } from "drizzle-kit";

export default {
  schema: "./server/db/schema/*",
  driver: "better-sqlite",
  dbCredentials: {
    url: process.env.DATABASE_URL as string,
  },
} satisfies Config;
