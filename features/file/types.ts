import { z } from "zod";
import { FILE_ERROR_CODES } from "./constants";

export type FileErrorCodeKey = keyof typeof FILE_ERROR_CODES;

export type AnyInput = z.ZodTypeAny;

export type MiddlewareFnArgs<TInput extends AnyInput> = {
  req: Request;
  input: z.infer<TInput>;
};

export type MiddlewareFn<TInput extends AnyInput, MOutput> = (
  args: MiddlewareFnArgs<TInput>
) => MOutput;

export type PathFnArgs<TInput extends AnyInput, MOutput> = {
  input: z.infer<TInput>;
  context: MOutput;
};

export type PathFn<TInput extends AnyInput, MOutput> = (
  args: PathFnArgs<TInput, MOutput>
) => string;

export type FileRouteArgs<TInput extends AnyInput, MOutput> = {
  input?: TInput;
  middleware?: MiddlewareFn<TInput, MOutput>;
  path: PathFn<TInput, MOutput> | string;
  maxFileSize?: number;
  acceptFileTypes?: string[];
};

export type FileRoute = {
  input?: AnyInput;
  middleware?: MiddlewareFn<AnyInput, any>;
  path: PathFn<AnyInput, any> | string;
  maxFileSize?: number;
  acceptFileTypes?: string[];
};

export type HandlerArgs = {
  routes: Record<string, FileRoute>;
};
