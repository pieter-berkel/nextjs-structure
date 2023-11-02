# NextJS Structure

Opinionated NextJS structure by Pieter Berkel based on most popular packages in the ecosystem.

## Changes from original create-next-app

### Update default files

1. Rename "**next.config.js**" to "**next.config.mjs**"
2. Update contents of "**next.config.mjs**"

   ```
   /** @type {import('next').NextConfig} */
   const config = {};

   export default config;
   ```

### Environment variables

1. Create "**.env.example**" file in root of project.

   ```
   DATABASE_URL=""

   NEXTAUTH_URL=""
   NEXTAUTH_SECRET=""
   ```

2. Create "**.env.local**" file in the root of the projects with the real environment variables.

   ```
   DATABASE_URL="mysql://YOUR_MYSQL_URL_HERE?ssl={"rejectUnauthorized":true}"

   NEXTAUTH_URL="http://localhost:3000"
   NEXTAUTH_SECRET="*******"
   ```

3. Install the T3 Env package

   ```
   pnpm add @t3-oss/env-nextjs zod
   ```

4. Follow the guide in the [T3 Env package](https://env.t3.gg/docs/nextjs)

5. Update "**/src/env.mjs**" file

   ```
    import { createEnv } from "@t3-oss/env-nextjs";
    import { z } from "zod";

    export const env = createEnv({
      server: {
        NODE_ENV: z
          .enum(["development", "test", "production"])
          .default("development"),
        DATABASE_URL: z.string().url(),
        NEXTAUTH_URL: z.preprocess(
          (str) => process.env.VERCEL_URL ?? str,
          process.env.VERCEL ? z.string() : z.string().url()
        ),
        NEXTAUTH_SECRET:
          process.env.NODE_ENV === "production"
            ? z.string()
            : z.string().optional(),
      },
      client: {
        // NEXT_PUBLIC_VAR: z.string().min(1),
      },
      runtimeEnv: {
        NODE_ENV: process.env.NODE_ENV,
        DATABASE_URL: process.env.DATABASE_URL,
        NEXTAUTH_URL: process.env.NEXTAUTH_URL,
        NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
      },
      emptyStringAsUndefined: true,
    });

   ```
