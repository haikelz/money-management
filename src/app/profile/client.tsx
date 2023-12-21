"use client";

import { useQueryClient } from "@tanstack/react-query";
import { signOut } from "next-auth/react";
import { useTheme } from "next-themes";
import Image from "next/image";
import { useState } from "react";
import { tw } from "~lib/helpers";
import { trpc } from "~lib/utils/trpc/client";

export function SignOutButton() {
  const { setTheme } = useTheme();

  function handleSignOut() {
    setTheme("light");
    signOut();
  }

  return (
    <button
      type="button"
      aria-label="settings"
      className={tw(
        "rounded-3xl flex justify-start w-full items-center space-x-4",
        "drop-shadow-md px-4 py-2 bg-zinc-50 dark:bg-zinc-800",
        "dark:border-2 dark:border-zinc-50"
      )}
      onClick={handleSignOut}
    >
      <Image
        src="/images/sign-out.svg"
        alt="sign out"
        width={41}
        height={41}
        className="p-0.5 rounded-md dark:bg-zinc-300"
      />
      <span className="font-medium text-base">Sign Out</span>
    </button>
  );
}

export function UploadImage({ id }: { id: string }) {
  const queryClient = useQueryClient();
  const [readFile, setReadFile] = useState<string>("");

  const { mutate } = trpc.uploadImageAccount.useMutation({
    mutationKey: [id],
    onSettled: async () =>
      await queryClient.invalidateQueries({ queryKey: [id], exact: true }),
    onSuccess: () => window.location.reload(),
  });

  async function reader(e) {
    e.preventDefault();
    const reader = new FileReader();

    reader.onload = async (e) => {
      const text = e.target.result;

      mutate({ id: id, newImage: text });
      setReadFile(text);
      console.log(text);
    };

    reader.readAsDataURL(e.target.files[0]);
  }

  console.log(typeof readFile);
  return (
    <div>
      <span>Upload Image</span>
      <input type="file" name="image" onChange={(e) => reader(e)} />
    </div>
  );
}
