"use client";

import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "next-themes";
import Provider from "~lib/utils/trpc/provider";
import { ChildrenProps } from "~types";

export default function Wrapper({ children }: ChildrenProps) {
  return (
    <SessionProvider>
      <Provider>
        <ThemeProvider attribute="class">{children}</ThemeProvider>
      </Provider>
    </SessionProvider>
  );
}
