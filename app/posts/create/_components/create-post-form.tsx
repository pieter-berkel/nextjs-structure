"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "~/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { createPost } from "../actions";
import { toast } from "sonner";
import { postSchema } from "~/server/db/schema/posts";

const createPostSchema = postSchema.omit({ id: true });
type CreatePostValues = z.infer<typeof createPostSchema>;

export const CreatePostForm = () => {
  const router = useRouter();

  const form = useForm<CreatePostValues>({
    resolver: zodResolver(createPostSchema),
    defaultValues: {
      name: "",
    },
  });

  const onSubmit = async (values: CreatePostValues) => {
    try {
      await createPost(values);
    } catch (error) {
      toast("Something went wrong!");
      return;
    }

    toast("Post created!");
    router.push("/posts");
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Naam</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit">Versturen</Button>
      </form>
    </Form>
  );
};
