"use client";

import { AnimatePresence, LazyMotion, domAnimation } from "framer-motion";
import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "next-themes";
import { Toaster } from "react-hot-toast";
import Provider from "~lib/utils/trpc/provider";
import { ChildrenProps } from "~types";

export default function Wrapper({ children }: ChildrenProps) {
  return (
    <SessionProvider>
      <Provider>
        <ThemeProvider attribute="class">
          <LazyMotion features={domAnimation}>
            <AnimatePresence mode="wait">{children}</AnimatePresence>
          </LazyMotion>
          <Toaster position="top-center" />
        </ThemeProvider>
      </Provider>
    </SessionProvider>
  );
}
