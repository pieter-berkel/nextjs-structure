import { z } from "zod";

export const editPostSchema = z.object({
  id: z.string(),
  name: z.string(),
});
