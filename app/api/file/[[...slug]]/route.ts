import { z } from "zod";
import { createFileNextAppHandler, createRoute } from "~/features/file";

export const dynamic = "force-dynamic";
export const runtime = "edge";

// const handler = async (
//   request: NextRequest,
//   { params }: { params: { slug: string[] } }
// ) => {
//   const method = request.method;
//   const path = params.slug.join("/");
//   const searchParams = request.nextUrl.searchParams;

//   const s3Client = new S3Client({
//     region: process.env.AWS_REGION,
//   });

//   switch (true) {
//     case method === "GET" && path === "signed-url": {
//       const filename = searchParams.get("filename");
//       const contentLength = searchParams.get("content-length");
//       const temporary = searchParams.get("temporary");

//       if (!filename) {
//         return new Response("[file]: filename is a required parameter.", {
//           status: 400,
//         });
//       }

//       if (filename.length > 250) {
//         return new Response(
//           "[file]: filename must be less than 250 characters.",
//           {
//             status: 400,
//           }
//         );
//       }

//       if (!contentLength) {
//         return new Response("[file]: content-length is a required parameter.", {
//           status: 400,
//         });
//       }

//       if (isNaN(Number(contentLength))) {
//         return new Response("[file]: content-length must be a number.", {
//           status: 400,
//         });
//       }

//       const { key, extension } = getFileData(filename);

//       const [entry] = await db
//         .insert(s.files)
//         .values({
//           name: key,
//           ext: extension,
//           size: Number(contentLength),
//           isConfirmed: false,
//           isTemporary: temporary === "true",
//           url: `https://${process.env.AWS_BUCKET_NAME}.s3.amazonaws.com/${key}`,
//         })
//         .returning();

//       try {
//         const command = new PutObjectCommand({
//           Bucket: process.env.AWS_BUCKET_NAME,
//           ACL: "public-read",
//           Key: key,
//           ContentLength: Number(contentLength),
//           Metadata: {
//             id: entry.id.toString(),
//           },
//         });

//         const signedUrl = await getSignedUrl(s3Client, command, {
//           expiresIn: 60,
//         });

//         return Response.json({ signedUrl, id: entry.id });
//       } catch (e) {
//         await db.delete(s.files).where(eq(s.files.id, entry.id));

//         return new Response("[file]: Unable to generate a signed URL.", {
//           status: 500,
//         });
//       }
//     }
//     case method === "GET" && path === "confirm": {
//       const id = searchParams.get("id");
//       let key = searchParams.get("key");

//       if (!id && !key) {
//         return new Response("[file]: id or key is a required parameter", {
//           status: 400,
//         });
//       }

//       if (id && isNaN(Number(id))) {
//         return new Response("[file]: id must be a number.", { status: 400 });
//       }

//       await db
//         .update(s.files)
//         .set({ isConfirmed: true })
//         .where(or(eq(s.files.id, Number(id)), eq(s.files.url, key ?? "")));

//       return new Response(null, { status: 204 });
//     }
//     case method === "DELETE" && path === "unconfirmed": {
//       const entries = await db
//         .select({ id: s.files.id, key: s.files.name })
//         .from(s.files)
//         .where(
//           and(
//             eq(s.files.isTemporary, true),
//             eq(s.files.isConfirmed, false),
//             sql`datetime(${s.files.createdAt}) <= datetime('now', '-1 day')`
//           )
//         );

//       if (entries.length === 0) {
//         return new Response(null, { status: 204 });
//       }

//       const command = new DeleteObjectsCommand({
//         Bucket: process.env.AWS_BUCKET_NAME,
//         Delete: {
//           Objects: entries.map((entry) => ({ Key: entry.key })),
//           Quiet: true,
//         },
//       });

//       await s3Client.send(command);

//       await db.delete(s.files).where(
//         inArray(
//           s.files.id,
//           entries.map((e) => e.id)
//         )
//       );

//       return new Response(null, { status: 204 });
//     }
//     case method === "DELETE": {
//       const id = searchParams.get("id");
//       let key = searchParams.get("key");

//       if (!id && !key) {
//         return new Response("[file]: id or key is a required parameter", {
//           status: 400,
//         });
//       }

//       if (!key && id) {
//         const [entry] = await db
//           .select({ key: s.files.name })
//           .from(s.files)
//           .where(eq(s.files.id, Number(id)));

//         if (!entry) {
//           return new Response("[file]: Database entry not found.", {
//             status: 404,
//           });
//         }

//         key = entry.key;
//       }

//       const command = new DeleteObjectCommand({
//         Bucket: process.env.AWS_BUCKET_NAME,
//         Key: key!,
//       });

//       await s3Client.send(command);

//       await db.delete(s.files).where(eq(s.files.name, key!));

//       return new Response(null, { status: 204 });
//     }
//     default:
//       return new Response("[file]: Not found.", { status: 404 });
//   }
// };

// const getFileData = (filename: string) => {
//   const [name, ...rest] = filename.split(".").map(kebabCase);
//   const extension = rest.pop()?.toLowerCase();
//   const suffix = crypto.randomBytes(5).toString("hex");
//   const key = `${name}_${suffix}${extension ? `.${extension}` : ""}`;
//   return { key, extension };
// };

// export { handler as DELETE, handler as GET };

const myRoute = createRoute({
  input: z.object({
    name: z.string(),
  }),
  middleware: () => {
    const userId = 1;
    return { userId };
  },
  path: ({ context }) => `/user/${context.userId}`,
  maxFileSize: 1024 * 1024, // 1MB
  acceptFileTypes: ["image/*"],
});

const handler = createFileNextAppHandler({
  routes: {
    public: myRoute,
  },
});

export { handler as GET, handler as POST };
