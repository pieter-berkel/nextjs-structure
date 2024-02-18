import { NextResponse } from "next/server";
import { z } from "zod";
import { builder } from "~/lib/action-builder";
import { db } from "~/server/db";

export async function GET() {
  const myAction = builder()
    .input(z.object({ name: z.string() }))
    .action(async () => {
      const posts = await db.query.posts.findMany();
      return posts;
    });

  const result = await myAction();

  return NextResponse.json(result);
}
