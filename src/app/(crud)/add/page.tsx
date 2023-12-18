import { Metadata } from "next";
import { Session } from "next-auth";
import { redirect } from "next/navigation";
import Section from "~components/section";
import { DEFAULT_OG_URL, SITE_URL } from "~lib/utils/constants";
import { serverSession } from "~lib/utils/server-session";

import Client from "./client";

const baseMetadata = {
  title: "Add new income/expense",
  description: "Add your new income/expense",
  url: `${SITE_URL}/add`,
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

export default async function Page() {
  const session = (await serverSession()) as Session;

  if (!session) redirect("/auth/sign-in");

  return (
    <Section>
      <div className="w-full">
        <h1 className="font-extrabold text-[28px]">Add New Income/Expense</h1>
        <Client
          email={session.user.email}
          username={session.user.name}
          createdAt={session.user.created_at}
        />
      </div>
    </Section>
  );
}
