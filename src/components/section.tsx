import { HTMLAttributes } from "react";
import { tw } from "~lib/helpers";

import Navbar from "./navbar";

type SectionProps = HTMLAttributes<HTMLDivElement>;

export default function Section(
  { className, children, ...props }: SectionProps
) {
  return (
    <section
      className={tw("w-full flex justify-center items-center", className)}
      {...props}
    >
      {children}
      <Navbar />
    </section>
  );
}
