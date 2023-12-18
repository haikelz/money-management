import { LabelHTMLAttributes } from "react";
import { tw } from "~lib/helpers";

type LabelProps = LabelHTMLAttributes<HTMLLabelElement>;

export function Label({ className, htmlFor, children, ...props }: LabelProps) {
  return (
    <label
      htmlFor={htmlFor}
      className={tw("font-semibold text-sm", className)}
      {...props}
    >
      {children}
    </label>
  );
}
