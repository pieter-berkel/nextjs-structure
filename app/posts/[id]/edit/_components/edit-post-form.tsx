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
import { editPost } from "../actions";
import { getPost } from "../data";
import { toast } from "sonner";
import { editPostSchema } from "../validations";

const schema = editPostSchema.omit({ id: true });
type EditPostValues = z.infer<typeof schema>;

type EditPostFormProps = {
  post: NonNullable<Awaited<ReturnType<typeof getPost>>>;
};

export const EditPostForm = ({ post }: EditPostFormProps) => {
  const router = useRouter();

  const form = useForm<EditPostValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: post.name ?? "",
    },
  });

  const onSubmit = async (values: EditPostValues) => {
    try {
      await editPost({ id: post.id, ...values });
    } catch (error) {
      toast("Something went wrong!");
      return;
    }

    toast("Post updated!");
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
