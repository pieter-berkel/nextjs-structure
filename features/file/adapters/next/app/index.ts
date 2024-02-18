import { NextRequest, NextResponse } from "next/server";
import type { HandlerArgs } from "../../../types";
import { FileError } from "../../../error";
import { z } from "zod";
import { requestUpload, requestUploadBodySchema } from "../../shared";
import { FILE_ERROR_CODES } from "../../../constants";

export const createFileNextAppHandler = ({ routes }: HandlerArgs) => {
  return async (
    req: NextRequest,
    { params }: { params: { slug: string[] } }
  ) => {
    try {
      const method = req.method;
      let body = method === "POST" ? await req.json() : null;

      const slug = params.slug.join("/");

      const searchParams = req.nextUrl.searchParams;
      const routeParam = searchParams.get("route");

      if (!routeParam) {
        throw new FileError({
          message: "route is a required parameter.",
          code: "BAD_REQUEST",
        });
      }

      const route = routes[routeParam];

      if (!route) {
        throw new FileError({
          message: "File route not found.",
          code: "BAD_REQUEST",
        });
      }

      const input =
        method === "POST" && route.input ? route.input.parse(body) : undefined;

      const context = route.middleware
        ? route.middleware({ req, input })
        : undefined;

      const path =
        typeof route.path === "string"
          ? route.path
          : route.path({ input, context });

      route.path = z
        .string()
        .min(1)
        .toLowerCase()
        .startsWith("/")
        .regex(/^\/[a-z0-9-_/]+$/)
        .transform((str) => str.substring(1))
        .parse(path);

      switch (true) {
        case method === "POST" && slug === "request-upload": {
          const res = await requestUpload({
            route,
            body: requestUploadBodySchema.parse(body),
          });

          return NextResponse.json(res);
        }
        default: {
          throw new FileError({
            message: "Not found",
            code: "NOT_FOUND",
          });
        }
      }
    } catch (e) {
      if (e instanceof FileError) {
        return new Response(e.message, {
          status: FILE_ERROR_CODES[e.code],
        });
      }

      if (e instanceof Error) {
        return new Response(e.message, {
          status: 500,
        });
      }

      return new Response("Internal server error", {
        status: 500,
      });
    }
  };
};
