"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { addDoc, collection } from "firebase/firestore";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { Button, Input, Label, TextArea } from "~components/ui";
import { tw } from "~lib/helpers";
import { db } from "~lib/utils/firebase";
import { addDataSchema } from "~lib/utils/schema";
import useGlobalStore from "~store";
import { TypeProps } from "~types";

export default function Client(
  { email, username }: { email: string; username: string }
) {
  const { type, setType } = useGlobalStore((state) => ({
    type: state.type as TypeProps,
    setType: state.setType,
  }));

  const router = useRouter();

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

  async function addDataToFireStore(
    email: string,
    username: string,
    type: TypeProps,
    amount: number,
    description: string
  ): Promise<void> {
    try {
      await addDoc(collection(db, "data"), {
        email: email,
        username: username,
        type: type,
        amount: amount,
        description: description,
      });
    } catch (err) {
      console.error(err);
    }
  }

  async function onSubmit(): Promise<void> {
    await addDataToFireStore(
      email ?? null,
      username ?? null,
      type,
      type === "Income"
        ? Number(getValues("amount"))
        : -Number(getValues("amount")),
      getValues("description")
    );

    router.push("/");
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
                src="/images/triangle-option.svg"
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
