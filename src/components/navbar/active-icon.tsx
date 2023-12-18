"use client";

import { HomeIcon, PlusCircleIcon, UserCircleIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { tw } from "~lib/helpers";

export function ActiveIcon() {
  const pathname = usePathname();

  return (
    <>
      <Link href="/">
        <button
          type="button"
          aria-label="home"
          className="flex flex-col justify-center items-center"
        >
          <HomeIcon
            size={20}
            className={tw(pathname === "/" ? "font-extrabold" : "/")}
          />
          <span
            className={tw(
              "font-semibold text-xs mt-0.5",
              pathname === "/" ? "font-extrabold" : ""
            )}
          >
            Home
          </span>
        </button>
      </Link>
      <Link href="/add">
        <button
          type="button"
          aria-label="add"
          className="flex flex-col justify-center items-center"
        >
          <PlusCircleIcon
            size={20}
            className={tw(pathname === "/add" ? "font-extrabold" : "")}
          />
          <span
            className={tw(
              "font-semibold text-xs mt-0.5",
              pathname === "/add" ? "font-extrabold" : ""
            )}
          >
            Add
          </span>
        </button>
      </Link>
      <Link href="/profile">
        <button
          type="button"
          aria-label="profile"
          className="flex flex-col justify-center items-center"
        >
          <UserCircleIcon
            size={20}
            className={tw(pathname === "/profile" ? "font-extrabold" : "")}
          />
          <span
            className={tw(
              "font-semibold text-xs mt-0.5",
              pathname === "/profile" ? "font-extrabold" : ""
            )}
          >
            Profile
          </span>
        </button>
      </Link>
    </>
  );
}
