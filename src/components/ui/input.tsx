import { VariantProps, cva } from "class-variance-authority";
import { InputHTMLAttributes } from "react";
import { UseFormRegister } from "react-hook-form";
import { tw } from "~lib/helpers";

const input = cva(
  "bg-zinc-200 border-brutalism dark:bg-zinc-800 rounded-lg px-3 py-1",
  {
    variants: {
      variant: {
        zinc: "bg-zinc-200",
        blue: "bg-blue-200",
        red: "bg-red-200",
      },
    },
    defaultVariants: {
      variant: "zinc",
    },
  }
);

type InputProps = InputHTMLAttributes<HTMLInputElement> &
  VariantProps<typeof input> & {
    register: UseFormRegister<any>;
  };

export function Input(
  { name, register, variant, className, ...props }: InputProps
) {
  return (
    <input
      {...register(name as string, { required: true })}
      name={name}
      className={tw(
        "border-brutalism rounded-lg px-3 py-1",
        input({ variant }),
        className
      )}
      {...props}
    />
  );
}
