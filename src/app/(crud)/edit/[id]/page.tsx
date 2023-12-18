import { collection, getDocs } from "firebase/firestore";
import { Metadata } from "next";
import { Session } from "next-auth";
import { redirect } from "next/navigation";
import Section from "~components/section";
import { DEFAULT_OG_URL, SITE_URL } from "~lib/utils/constants";
import { db } from "~lib/utils/firebase";
import { serverSession } from "~lib/utils/server-session";
import { DataFromFireStoreProps, FieldsProps } from "~types";

import Client from "./client";

async function getDataFromFireStore(): Promise<
  DataFromFireStoreProps | undefined
> {
  try {
    const response = await getDocs(collection(db, "data"));
    return response;
  } catch (err) {
    console.error(err);
  }
}

export async function generateMetadata(): Promise<Metadata> {
  const baseMetadata = {
    title: "Money Management",
    description: "Kickstart your money management with our app",
    url: SITE_URL,
  };

  const { title, description, url } = baseMetadata;

  return {
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
}

export async function generateStaticParams(): Promise<{ id: string }[]> {
  const response = (await getDataFromFireStore()) as DataFromFireStoreProps;
  return response.docs.map((item) => ({ id: item.id }));
}

export default async function Page({ params }: { params: { id: string } }) {
  const { id } = params;
  const session = (await serverSession()) as Session;

  if (!session) return redirect("/auth/sign-in");

  const data = (await getDataFromFireStore()) as DataFromFireStoreProps;
  const foundData = data.docs
    .find((item) => item.id === id)
    ?.data() as FieldsProps;

  return (
    <Section>
      <div className="w-full">
        <h1 className="font-extrabold text-[28px]">Edit Income/Expense</h1>
        <Client id={id} foundData={foundData} />
      </div>
    </Section>
  );
}
