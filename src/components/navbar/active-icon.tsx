"use client";

import {
  HomeIcon,
  LucideIcon,
  PlusCircleIcon,
  UserCircleIcon,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { tw } from "~lib/helpers";

const iconsList: Array<{
  id: number;
  title: string;
  href: string;
  icon: LucideIcon;
}> = [
  {
    id: 1,
    title: "Home",
    href: "/",
    icon: HomeIcon,
  },
  {
    id: 2,
    title: "Add",
    href: "/add",
    icon: PlusCircleIcon,
  },
  {
    id: 3,
    title: "Profile",
    href: "/profile",
    icon: UserCircleIcon,
  },
];

export function ActiveIcon() {
  const pathname = usePathname();

  return (
    <>
      {iconsList.map((item) => {
        const Icon: LucideIcon = item.icon;
        return (
          <Link href={item.href} key={item.id}>
            <button
              type="button"
              aria-label={item.title}
              className="flex flex-col justify-center items-center"
            >
              <Icon
                size={20}
                className={tw(pathname === item.href ? "font-extrabold" : "")}
              />
              <span
                className={tw(
                  "font-semibold text-xs mt-0.5",
                  pathname === item.href ? "font-extrabold" : ""
                )}
              >
                {item.title}
              </span>
            </button>
          </Link>
        );
      })}
    </>
  );
}
