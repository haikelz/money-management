import { VariantProps, cva } from "class-variance-authority";
import { ButtonHTMLAttributes } from "react";
import { tw } from "~lib/helpers";

const button = cva(
  "font-bold text-lg rounded-lg border-t-2 border-r-4 border-b-4 border-zinc-900 px-6 py-1.5 border-l-2 text-zinc-900",
  {
    variants: {
      variant: {
        zinc: "bg-zinc-200",
        red: "bg-red-200",
        blue: "bg-blue-200",
      },
    },
    defaultVariants: {
      variant: "blue",
    },
  }
);

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof button>;

export function Button(
  { variant, className, children, ...props }: ButtonProps
) {
  return (
    <button className={tw(button({ variant }), className)} {...props}>
      {children}
    </button>
  );
}
