import { Metadata } from "next";
import { Session } from "next-auth";
import { redirect } from "next/navigation";
import Section from "~components/section";
import { DEFAULT_OG_URL, SITE_URL } from "~lib/utils/constants";
import { serverSession } from "~lib/utils/server-session";

import Client from "./client";

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

export default async function Page() {
  const session = (await serverSession()) as Session;

  if (!session) return redirect("/auth/sign-in");

  return (
    <Section>
      <div className="w-full">
        <div>
          <h1 className="font-extrabold text-[28px]">
            Hi, {session.user.name} 👋
          </h1>
          <p className="font-medium text-sm">How&#39;s your day?</p>
        </div>
        <Client />
      </div>
    </Section>
  );
}
