import type { Metadata } from "next";
import { tw } from "~lib/helpers";
import { DEFAULT_OG_URL, SITE_URL } from "~lib/utils/constants";
import { archivo } from "~lib/utils/fonts";
import { ChildrenProps } from "~types";

import "./globals.css";
import Wrapper from "./wrapper";

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

export default function RootLayout({ children }: ChildrenProps) {
  return (
    <html lang="en">
      <body className={tw(archivo.className)}>
        <Wrapper>
          <main
            className={tw(
              "w-full flex flex-col justify-center",
              "items-center max-w-full text-zinc-900 dark:text-zinc-50"
            )}
          >
            <div className="w-full max-w-md min-h-screen p-4">{children}</div>
          </main>
        </Wrapper>
      </body>
    </html>
  );
}
