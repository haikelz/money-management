import { tw } from "~lib/helpers";

import { ActiveIcon } from "./active-icon";

export default function Navbar() {
  return (
    <nav
      className={tw(
        "border-brutalism rounded-lg fixed z-10 bottom-3 bg-blue-200 dark:bg-zinc-800",
        "min-w-[270px] px-2 py-2 flex justify-center items-center space-x-10"
      )}
    >
      <ActiveIcon />
    </nav>
  );
}
