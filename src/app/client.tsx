"use client";

import { useQueryClient } from "@tanstack/react-query";
import { TrashIcon } from "lucide-react";
import toast from "react-hot-toast";
import { trpc } from "~lib/utils/trpc/client";

export function DeleteButton({ id }: { id: string }) {
  const queryClient = useQueryClient();

  const { mutate } = trpc.delete.useMutation({
    mutationKey: [id],
    onSettled: async () => {
      return await queryClient.invalidateQueries({
        queryKey: [id],
        exact: true,
      });
    },
    onSuccess: () => window.location.reload(),
    onError: () =>
      toast("Terjadi masalah saat menghapus data! Silahkan coba lagi"),
  });

  function deleteField() {
    mutate({ id: id });
  }

  return (
    <button type="button" aria-label="delete" onClick={deleteField}>
      <TrashIcon size={20} />
    </button>
  );
}
