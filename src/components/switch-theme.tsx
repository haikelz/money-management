"use client";

import { MoonIcon, SunIcon } from "lucide-react";
import { useTheme } from "next-themes";

export default function SwitchTheme() {
  const { theme, setTheme } = useTheme();
  console.log(theme);
  return (
    <button
      type="button"
      aria-label="switch theme"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="px-2 py-1"
    >
      {theme === "dark" ? (
        <SunIcon className="text-zinc-800 dark:text-zinc-50" size={28} />
      ) : (
        <MoonIcon className="text-zinc-800 dark:text-zinc-50" size={28} />
      )}
    </button>
  );
}
