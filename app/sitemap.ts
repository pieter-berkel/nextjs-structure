import { MetadataRoute } from "next";
import { BASE_URL } from "~/lib/constants";
import { db } from "~/server/db";

export default async function sitemap() {
  const map: MetadataRoute.Sitemap = [
    {
      url: `${BASE_URL}/`,
    },
    {
      url: `${BASE_URL}/posts`,
    },
    {
      url: `${BASE_URL}/posts/create`,
    },
  ];

  const posts = await db.query.posts.findMany({ columns: { id: true } });

  for (const post of posts) {
    map.push({
      url: `${BASE_URL}/posts/${post.id}`,
    });
  }

  return map;
}
