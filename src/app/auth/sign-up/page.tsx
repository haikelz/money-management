import { Metadata } from "next";
import Image from "next/image";
import { redirect } from "next/navigation";
import Section from "~components/section";
import { DEFAULT_OG_URL, SITE_URL } from "~lib/utils/constants";
import { serverSession } from "~lib/utils/server-session";

import Client from "./client";

const baseMetadata = {
  title: "Sign Up",
  description: "Sign Up to Money Management",
  url: `${SITE_URL}/sign-in`,
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
  const session = await serverSession();

  if (session) return redirect("/");

  return (
    <Section>
      <div className="w-full">
        <div className="w-full flex flex-col justify-center items-center">
          <h1 className="text-3xl font-extrabold">Create new account</h1>
        </div>
        <Client />
      </div>
    </Section>
  );
}
