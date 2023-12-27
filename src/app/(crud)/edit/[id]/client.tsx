"use client";

import { useQueryClient } from "@tanstack/react-query";
import Image from "next/image";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Button, Input, Label, TextArea } from "~components/ui";
import { tw } from "~lib/helpers";
import { trpc } from "~lib/utils/trpc/client";
import { FieldsProps } from "~types";

export default function Client(
  { id, foundData }: { id: string; foundData: FieldsProps }
) {
  const { amount, description } = foundData;

  const queryClient = useQueryClient();

  const [type, setType] = useState<"Income" | "Expense">(foundData.type);

  const {
    register,
    getValues,
    formState: { errors },
    handleSubmit,
  } = useForm({
    defaultValues: {
      amount: amount,
      description: description,
    },
  });

  const { mutate } = trpc.patch.useMutation({
    mutationKey: ["patch-data"],
    onSettled: async () =>
      await queryClient.invalidateQueries({
        queryKey: ["patch-data"],
      }),
    onSuccess: () => {
      toast("Sukses edit data!");
      setTimeout(() => {
        window.location.replace("/");
      }, 1000);
    },
    onError: () =>
      toast("Terjadi masalah saat submit data perubahan! Silahkan coba lagi"),
  });

  // update data
  function onSubmit() {
    mutate({
      id: id,
      data: {
        type: type,
        amount:
          type === "Expense" && getValues("amount").toString().includes("-")
            ? Number(getValues("amount"))
            : type === "Income" && getValues("amount").toString().includes("-")
            ? -Number(getValues("amount"))
            : type === "Income"
            ? Number(getValues("amount"))
            : -Number(getValues("amount")),
        description: getValues("description"),
      },
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
            <span>{type}</span>
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
                className={tw(type === "Income" ? "rotate-180" : "")}
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
            required
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
            required
            className="mt-1 h-[124px]"
          />
          {errors.description ? (
            <span className="mt-0.5">{errors.description.message}</span>
          ) : null}
        </div>
      </div>
      <div className="w-full flex justify-center items-center">
        <Button variant="blue" className="mt-4" type="submit">
          Edit
        </Button>
      </div>
    </form>
  );
}
