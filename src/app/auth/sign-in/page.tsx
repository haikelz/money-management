import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import { DEFAULT_OG_URL, SITE_URL } from "~lib/utils/constants";
import { serverSession } from "~lib/utils/server-session";

import Client from "./client";

const baseMetadata = {
  title: "Sign In",
  description: "Sign In to Money Management",
  url: `${SITE_URL}/auth/sign-in`,
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
    <section className="w-full flex justify-center items-center">
      <div className="w-full">
        <div className="w-full flex flex-col justify-center items-center">
          <Image
            src="/images/logo.png"
            width={300}
            height={300}
            alt="money management login"
            className="dark:text-zinc-50"
          />
          <h1 className="text-3xl font-extrabold">Money Management</h1>
        </div>
        <Client />
        <div className="text-center mt-4">
          <span className="font-medium">
            Don&#39;t have account?{" "}
            <Link href="/auth/sign-up" className="font-bold">
              Sign Up
            </Link>
          </span>
        </div>
      </div>
    </section>
  );
}
