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

const schema = z.object({
  name: z.string(),
  image: z.any(),
});

type FormValues = z.infer<typeof schema>;

export const CreatePostForm = () => {
  const router = useRouter();

  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
    },
  });

  const {
    formState: { isSubmitting },
  } = form;

  const onSubmit = async (values: FormValues) => {
    console.log("VALUES", values);

    const image = values.image as FileList;
    const file = image[0];

    console.log("FILE", file);

    const res = await fetch(`/api/file/request-upload?route=public`, {
      method: "POST",
      body: JSON.stringify({
        name: "hello world",
        filename: file.name,
        size: file.size,
        type: file.type,
        temporary: true,
      }),
    });

    const { signedUrl } = await res.json();

    const res2 = await fetch(signedUrl, {
      method: "PUT",
      body: file,
    });

    const data2 = await res2.text();

    console.log("RES2", res2);
    console.log("DATA2", data2);

    return;

    try {
      await createPost(values);
    } catch (error) {
      return toast.error("Something went wrong!");
    }

    toast.success("Post created!");
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

        <FormField
          control={form.control}
          name="image"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Afbeelding</FormLabel>
              <FormControl>
                <Input
                  type="file"
                  onChange={(e) => field.onChange(e.target.files)}
                />
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
