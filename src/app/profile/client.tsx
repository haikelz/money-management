"use client";

import { signOut } from "next-auth/react";
import Image from "next/image";
import { tw } from "~lib/helpers";

export function SignOutButton() {
  return (
    <button
      type="button"
      aria-label="settings"
      className={tw(
        "rounded-3xl flex justify-start w-full items-center space-x-4",
        "drop-shadow-md px-4 py-2 bg-zinc-50 dark:bg-zinc-800",
        "dark:border-2 dark:border-zinc-50"
      )}
      onClick={() => signOut()}
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
