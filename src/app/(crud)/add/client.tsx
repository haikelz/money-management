"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { QueryClient, useQueryClient } from "@tanstack/react-query";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { Button, Input, Label, TextArea } from "~components/ui";
import { tw } from "~lib/helpers";
import { addDataSchema } from "~lib/utils/schema";
import { trpc } from "~lib/utils/trpc/client";
import useGlobalStore from "~store";
import { TypeProps } from "~types";

export default function Client(
  {
    email,
    name,
    created_at,
  }: {
    email: string;
    name: string;
    created_at: string;
  }
) {
  const { type, setType } = useGlobalStore((state) => ({
    type: state.type as TypeProps,
    setType: state.setType,
  }));

  const queryClient: QueryClient = useQueryClient();

  const {
    register,
    getValues,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      amount: null,
      description: "",
    },
    resolver: zodResolver(addDataSchema),
  });

  const { mutate } = trpc.post.useMutation({
    mutationKey: ["post-data"],
    onSettled: async () =>
      await queryClient.invalidateQueries({
        queryKey: ["post-data"],
      }),
    onSuccess: () => window.location.replace("/"),
  });

  function onSubmit() {
    mutate({
      email: email ?? null,
      name: name ?? null,
      created_at: created_at ?? null,
      type: type,
      amount:
        type === "Income"
          ? Number(getValues("amount"))
          : -Number(getValues("amount")),
      description: getValues("description"),
    });
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="space-y-5 mt-5">
        <div className="flex flex-col">
          <Label htmlFor="type" className="font-semibold text-sm">
            Type
          </Label>
          <div
            className={tw(
              "border-brutalism flex justify-between items-center",
              "bg-zinc-200 dark:bg-zinc-800 mt-1 rounded-lg font-semibold px-3 py-1"
            )}
          >
            <span className="text-base font-semibold">{type}</span>
            <button
              type="button"
              aria-label="select"
              onClick={() => setType(type === "Income" ? "Expense" : "Income")}
            >
              <Image
                src={`/images/${
                  type === "Income" ? "increase.svg" : "decrease.svg"
                }`}
                alt="triangle"
                width={21}
                height={21}
                className={tw(type === "Income" ? "rotate-180" : "rotate-0")}
              />
            </button>
          </div>
        </div>
        <div className="flex flex-col">
          <Label htmlFor="amount" className="font-semibold text-sm">
            Amount
          </Label>
          <Input
            register={register}
            type="number"
            name="amount"
            className="mt-1"
          />
          {errors.amount ? (
            <span className="mt-0.5">{errors.amount.message}</span>
          ) : null}
        </div>
        <div className="flex flex-col">
          <Label htmlFor="description" className="font-semibold text-sm">
            Description
          </Label>
          <TextArea
            register={register}
            name="description"
            variant="zinc"
            className="mt-1 h-[124px]"
          />
          {errors.description ? (
            <span className="mt-0.5">{errors.description.message}</span>
          ) : null}
        </div>
      </div>
      <div className="w-full flex justify-center items-center">
        <Button variant="blue" className="mt-4" type="submit">
          Add
        </Button>
      </div>
    </form>
  );
}
