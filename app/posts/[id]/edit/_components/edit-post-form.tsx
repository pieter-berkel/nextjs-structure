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
import { editPost, getPost } from "../server";
import { toast } from "sonner";

const schema = z.object({
  name: z.string(),
});

type FormValues = z.infer<typeof schema>;

type EditPostFormProps = {
  post: NonNullable<Awaited<ReturnType<typeof getPost>>>;
};

export const EditPostForm = ({ post }: EditPostFormProps) => {
  const router = useRouter();

  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: post.name ?? "",
    },
  });

  const {
    formState: { isSubmitting },
  } = form;

  const onSubmit = async (values: FormValues) => {
    try {
      await editPost({ id: post.id, ...values });
    } catch (error) {
      return toast.error("Something went wrong!");
    }

    toast.success("Post updated!");
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

        <Button type="submit" disabled={isSubmitting}>
          Versturen
        </Button>
      </form>
    </Form>
  );
};
