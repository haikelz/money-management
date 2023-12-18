"use client";

import { doc, updateDoc } from "firebase/firestore";
import Image from "next/image";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button, Input, Label, TextArea } from "~components/ui";
import { tw } from "~lib/helpers";
import { db } from "~lib/utils/firebase";
import { FieldsProps } from "~types";

export default function Client(
  { id, foundData }: { id: string; foundData: FieldsProps }
) {
  const { amount, description } = foundData;

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

  // update data
  async function onSubmit(): Promise<void> {
    const reference = doc(db, "data", id);

    await updateDoc(reference, {
      type: type,
      amount: Number(getValues("amount")),
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
              "bg-zinc-200 mt-1 rounded-lg font-semibold px-3 py-1"
            )}
          >
            <span>{type}</span>
            <button
              type="button"
              aria-label="select"
              onClick={() => setType(type === "Income" ? "Expense" : "Income")}
            >
              <Image
                src="/images/triangle-option.svg"
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
          {errors.amount ? <span>{errors.amount.message}</span> : null}
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
            <span>{errors.description.message}</span>
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
