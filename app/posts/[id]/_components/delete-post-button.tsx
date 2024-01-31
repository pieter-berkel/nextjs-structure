"use client";

import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "~/components/ui/button";
import { deletePost } from "../server";

type DeletePostButtonProps = {
  id: string;
};

export const DeletePostButton = ({ id }: DeletePostButtonProps) => {
  const router = useRouter();

  const handleDelete = async () => {
    try {
      await deletePost({ id });
    } catch (error) {
      toast.error("Something went wrong!");
      return;
    }

    toast.success("Post deleted!");
    router.push("/posts");
  };

  return (
    <Button variant="destructive" onClick={handleDelete}>
      Verwijderen
    </Button>
  );
};
