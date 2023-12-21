import { Metadata } from "next";
import { Session } from "next-auth";
import dynamic from "next/dynamic";
import Image from "next/image";
import { redirect } from "next/navigation";
import Section from "~components/section";
import { getData } from "~features/crud";
import { getUserAccount } from "~features/new-account";
import { toRupiah, tw } from "~lib/helpers";
import { DEFAULT_OG_URL, SITE_URL } from "~lib/utils/constants";
import { randomAvatar } from "~lib/utils/random-avatar";
import { serverSession } from "~lib/utils/server-session";
import { DataFromFireStoreProps } from "~types";

import { SignOutButton, UploadImage } from "./client";

export const revalidate = 0;

const baseMetadata = {
  title: "Profile",
  description: "Your profile",
  url: `${SITE_URL}/profile`,
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

const SwitchTheme = dynamic(() => import("~components/switch-theme"), {
  ssr: false,
  loading: () => (
    <div className="w-8 h-8 rounded-full animate-pulse dark:bg-zinc-700 bg-[#d9d9d9]"></div>
  ),
});

const optionsList: Array<{ id: number; name: string; image: string }> = [
  {
    id: 1,
    name: "Switch Theme",
    image: "/images/moon.svg",
  },
  {
    id: 2,
    name: "Settings",
    image: "/images/settings.svg",
  },
  {
    id: 3,
    name: "My History",
    image: "/images/history.svg",
  },
];

export default async function Page() {
  const session = (await serverSession()) as Session;

  if (!session) return redirect("/auth/sign-in");

  const data = (await getData(
    session.user.name,
    session.user.email
  )) as DataFromFireStoreProps;

  const userAccount = (await getUserAccount(
    session.user.name,
    "haikel"
  )) as DataFromFireStoreProps;

  // total balance
  const balance = data.docs.map((item) => item.data().amount);

  const id = userAccount.docs.map((item) => item.id);

  console.log(id);
  return (
    <Section className="flex flex-col justify-between min-h-screen items-center">
      <div className="w-full">
        <h1 className="font-extrabold text-[28px]">Profile</h1>
        <div className="mt-2 flex flex-col">
          <div className="border-brutalism rounded-lg bg-zinc-200 dark:bg-zinc-800 px-3 py-2">
            <div className="flex space-x-4 items-start">
              <Image
                src={
                  session.user.image
                    ? session.user.image
                    : randomAvatar(session.user.name)
                }
                alt="profile"
                width={75}
                height={75}
                className="rounded-full border-2 border-zinc-900 dark:border-zinc-50"
              />
              <UploadImage id={id} />
              <div>
                <h4 className="font-bold text-xl">{session.user.name}</h4>
                <p className="font-medium text-sm">{session.user.email}</p>
              </div>
            </div>
            <p className="font-semibold text-right text-sm">
              {toRupiah(
                balance.length === 0 || balance.reduce((a, b) => a + b) < 0
                  ? 0
                  : balance.reduce((a, b) => a + b)
              )}
            </p>
          </div>
          <div className="border-brutalism mt-6 bg-zinc-200 dark:bg-zinc-800 rounded-lg p-3">
            <div className="flex justify-center items-center space-x-4">
              <Image
                src="/images/wallet.svg"
                alt="wallet"
                width={76}
                height={76}
              />
              <div>
                <h4 className="font-bold text-xl">Link your bank accounts</h4>
                <p className="text-sm mt-2">
                  Enjoy the benefits of linking your bank accounts to this
                  service.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        className={tw(
          "bg-red-400 dark:bg-zinc-800 w-full h-[430px] rounded-lg",
          "px-6 space-y-4 py-8 border-2 border-zinc-900"
        )}
      >
        {optionsList.map((item) => {
          if (item.name === "Switch Theme") {
            return (
              <div
                className={tw(
                  "rounded-3xl flex w-full justify-between items-center",
                  "drop-shadow-md px-4 py-2 bg-zinc-50 dark:bg-zinc-800",
                  "dark:border-2 dark:border-zinc-50"
                )}
                key={item.id}
              >
                <div className="flex justify-center items-center space-x-4">
                  <Image
                    src={item.image}
                    alt={item.name}
                    width={41}
                    height={41}
                    className="dark:bg-zinc-300 p-0.5 rounded-md"
                  />
                  <span className="font-medium text-base">{item.name}</span>
                </div>
                <SwitchTheme />
              </div>
            );
          } else
            return (
              <button
                type="button"
                aria-label={item.name}
                className={tw(
                  "rounded-3xl flex justify-start w-full items-center space-x-4",
                  "drop-shadow-md px-4 py-2 bg-zinc-50 dark:bg-zinc-800",
                  "dark:border-2 dark:border-zinc-50"
                )}
                key={item.id}
              >
                <Image
                  src={item.image}
                  alt={item.name}
                  width={41}
                  height={41}
                  className="p-0.5 dark:bg-zinc-300 rounded-md"
                />
                <span className="font-medium text-base">{item.name}</span>
              </button>
            );
        })}
        <SignOutButton />
      </div>
    </Section>
  );
}
