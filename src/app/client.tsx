"use client";

import { keepPreviousData, useQueryClient } from "@tanstack/react-query";
import { DocumentData } from "firebase/firestore";
import { PencilIcon, TrashIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { toRupiah, tw } from "~lib/helpers";
import { trpc } from "~lib/utils/trpc/client";
import { DataFromFireStoreProps } from "~types";

export default function Client() {
  const {
    data: documentData,
    isPending,
    isError,
  } = trpc.get.useQuery({
    placeholderData: keepPreviousData,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });

  if (isPending) return <p>Loading</p>;
  if (isError) return <p>Error</p>;

  const data = documentData as DataFromFireStoreProps;

  // total balance
  const balance = data.docs.map((item) => item.data().amount);

  // total income
  const income = data.docs
    .filter((item) => item.data().type === "Income")
    .map((item) => item.data().amount);

  // total expenses
  const expenses = data.docs
    .filter((item) => item.data().type === "Expense")
    .map((item) => item.data().amount);

  return (
    <>
      <div className="mt-4">
        <div
          className={tw(
            "bg-blue-200 dark:bg-zinc-800 flex flex-col",
            "flex-row justify-center items-center",
            "border-brutalism p-6 rounded-lg"
          )}
        >
          <Image
            src="/images/money-balance.svg"
            alt="balance"
            width={154}
            height={132}
          />
          <div>
            <p className="font-medium text-xl">Balance:</p>
            <p className="font-extrabold text-[23px]">
              {toRupiah(
                balance.length === 0 || balance.reduce((a, b) => a + b) < 0
                  ? 0
                  : balance.reduce((a, b) => a + b)
              )}
            </p>
          </div>
        </div>
        <div className="flex mt-2.5 w-full space-x-2.5">
          <div
            className={tw(
              "border-brutalism w-full rounded-lg p-3",
              "h-full bg-red-200 dark:bg-zinc-800"
            )}
          >
            <Image
              src="/images/money-flower.svg"
              alt="income"
              width={79.53}
              height={76}
            />
            <div className="mt-2">
              <p className="font-medium text-sm">Income:</p>
              <p className="font-extrabold text-[17px]">
                {toRupiah(income.length ? income.reduce((a, b) => a + b) : 0)}
              </p>
            </div>
          </div>
          <div
            className={tw(
              "border-brutalism w-full rounded-lg p-3",
              "h-full bg-yellow-200 dark:bg-zinc-800"
            )}
          >
            <Image
              src="/images/money-expense.svg"
              alt="expense"
              width={79.53}
              height={76}
            />
            <div className="mt-2">
              <p className="font-medium text-sm">Expenses:</p>
              <p className="font-extrabold text-[17px]">
                {toRupiah(
                  expenses.length ? expenses.reduce((a, b) => a + b) : 0
                )}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-3">
        <span className="font-medium text-sm">Your history:</span>
        <div className="space-y-2.5 mt-1">
          {data.docs.length ? (
            data.docs.map((item) => {
              const fields: DocumentData = item.data();
              return (
                <div
                  key={item.id}
                  className="bg-zinc-200 dark:bg-zinc-800 border-brutalism px-3 py-2 rounded-lg"
                >
                  <div className="flex w-full justify-between items-start">
                    <h4 className="font-bold text-base">{fields.type}</h4>
                    <div className="space-x-2">
                      <DeleteButton id={item.id} />
                      <Link href={`/edit/${item.id}`}>
                        <button type="button" aria-label="edit">
                          <PencilIcon size={20} />
                        </button>
                      </Link>
                    </div>
                  </div>
                  <p className="text-sm font-medium">{fields.description}</p>
                  <p className="text-sm mt-3 font-medium">
                    {toRupiah(fields.amount)}
                  </p>
                </div>
              );
            })
          ) : (
            <p className="text-xl font-bold mt-3 text-center">
              Belum ada data!
            </p>
          )}
        </div>
      </div>
    </>
  );
}

export function DeleteButton({ id }: { id: string }) {
  const queryClient = useQueryClient();

  const deleteMutation = trpc.delete.useMutation({
    mutationKey: [id],
    onSettled: async () => {
      return await queryClient.invalidateQueries({
        queryKey: [id],
        exact: true,
      });
    },
  });

  function deleteField() {
    deleteMutation.mutate({ id: id });
    window.location.reload();
  }

  return (
    <button type="button" aria-label="delete" onClick={deleteField}>
      <TrashIcon size={20} />
    </button>
  );
}
