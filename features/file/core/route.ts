import { z } from "zod";
import type { AnyInput, FileRoute, FileRouteArgs } from "../types";

export const createRoute = <
  TInput extends AnyInput = z.ZodNever,
  MOutput = any
>(
  args: FileRouteArgs<TInput, MOutput>
): FileRoute => {
  return args as FileRoute;
};
