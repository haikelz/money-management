import { VariantProps, cva } from "class-variance-authority";
import { TextareaHTMLAttributes } from "react";
import { UseFormRegister } from "react-hook-form";
import { tw } from "~lib/helpers";

const textarea = cva("border-brutalism dark:bg-zinc-800 rounded-lg px-4 py-2", {
  variants: {
    variant: {
      blue: "bg-blue-200",
      zinc: "bg-zinc-200",
      red: "bg-red-200",
    },
  },
  defaultVariants: {
    variant: "zinc",
  },
});

type TextAreaProps = TextareaHTMLAttributes<HTMLTextAreaElement> &
  VariantProps<typeof textarea> & {
    register: UseFormRegister<any>;
  };

export function TextArea(
  { name, register, className, variant, ...props }: TextAreaProps
) {
  return (
    <textarea
      {...register(name as string, { required: true })}
      name={name}
      className={tw(textarea({ variant }), className)}
      {...props}
    />
  );
}
