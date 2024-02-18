import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { formatFileSize, generateFileData } from "../utils";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { z } from "zod";
import { AWS_CREDENTIALS } from "../constants";
import { FileRoute } from "../types";
import { FileError } from "../error";

export const requestUploadBodySchema = z.object({
  filename: z.string().max(245),
  size: z.number(),
  type: z.string().regex(/\w+\/[-+.\w]+/),
  temporary: z.boolean().optional().default(false),
});

export type RequestUploadBody = z.infer<typeof requestUploadBodySchema>;

export const requestUpload = async (params: {
  body: RequestUploadBody;
  route: FileRoute;
}) => {
  const { route, body } = params;

  if (route.maxFileSize && body.size > route.maxFileSize) {
    throw new FileError({
      code: "FILE_TOO_LARGE",
      message: `File is too large. Max file size is ${formatFileSize(
        route.maxFileSize
      )}.`,
    });
  }

  if (route.acceptFileTypes) {
    let accepted = false;

    for (const accept of route.acceptFileTypes) {
      if (accept.endsWith("/*")) {
        const mimeType = accept.replace("/*", "");
        if (body.type.startsWith(mimeType)) {
          accepted = true;
          break;
        }
      } else if (body.type === accept) {
        accepted = true;
        break;
      }
    }

    if (!accepted) {
      throw new FileError({
        code: "MEDIA_TYPE_NOT_ACCEPTED",
        message: `"${
          body.type
        }" is not allowed. Accepted types are ${JSON.stringify(
          route.acceptFileTypes
        )}`,
      });
    }
  }

  const { key } = generateFileData(body.filename);

  const s3Client = new S3Client({
    region: process.env.AWS_REGION,
    credentials: AWS_CREDENTIALS,
  });

  const command = new PutObjectCommand({
    Bucket: process.env.AWS_BUCKET_NAME,
    ACL: "public-read",
    Key: `${route.path}/${key}`,
    ContentLength: body.size,
    ContentType: body.type,
  });

  const signedUrl = await getSignedUrl(s3Client, command, {
    expiresIn: 60,
  });

  return { signedUrl };
};
