import {
  DocumentData,
  collection,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { PencilIcon } from "lucide-react";
import { Metadata } from "next";
import { Session } from "next-auth";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import Section from "~components/section";
import { tw } from "~lib/helpers";
import { DEFAULT_OG_URL, SITE_URL } from "~lib/utils/constants";
import { db } from "~lib/utils/firebase";
import { serverSession } from "~lib/utils/server-session";
import { toRupiah } from "~lib/utils/to-rupiah";
import { DataFromFireStoreProps } from "~types";

import { DeleteButton } from "./client";

const baseMetadata = {
  title: "Money Management",
  description: "Kickstart your money management with our app",
  url: SITE_URL,
};

const { title, description, url } = baseMetadata;

export const metadata: Metadata = {
  title,
  description,
  openGraph: {
    type: "website",
    url,
    title,
    description,
    images: [
      {
        url: DEFAULT_OG_URL,
        alt: "OG Image",
      },
    ],
    siteName: url,
  },
  twitter: {
    title,
    description,
    site: url,
    card: "summary_large_image",
  },
  metadataBase: new URL(url),
};

async function getDataFromFireStore(
  session: Session
): Promise<DataFromFireStoreProps | undefined> {
  try {
    const response = await getDocs(collection(db, "data"));
    return response;
  } catch (err) {
    console.error(err);
  }
}

export default async function Page() {
  const session = (await serverSession()) as Session;

  if (!session) return redirect("/auth/sign-in");

  const data = (await getDataFromFireStore(session)) as DataFromFireStoreProps;

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
    <Section>
      <div className="w-full">
        <div>
          <h1 className="font-extrabold text-[28px]">
            Hi, {session.user.name} 👋
          </h1>
          <p className="font-medium text-sm">How&#39;s your day?</p>
        </div>
        {/** Balance, income, and expenses */}
        <div className="mt-4">
          <div
            className={tw(
              "bg-blue-200 dark:bg-zinc-800 flex justify-center items-center",
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
            <div className="border-brutalism w-full rounded-lg p-3 h-full bg-red-200 dark:bg-zinc-800">
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
            <div className="border-brutalism w-full rounded-lg p-3 h-full bg-yellow-200 dark:bg-zinc-800">
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
        {/** History */}
        <History data={data} />
      </div>
    </Section>
  );
}

function History({ data }: { data: DataFromFireStoreProps }) {
  return (
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
          <p className="text-xl font-bold mt-3 text-center">Belum ada data!</p>
        )}
      </div>
    </div>
  );
}
