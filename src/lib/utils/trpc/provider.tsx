"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { httpBatchLink } from "@trpc/react-query";
import { useState } from "react";
import { env } from "~env.mjs";
import { ChildrenProps } from "~types";

import { CONDITION } from "../constants";
import { trpc } from "./client";

const { NEXT_PUBLIC_PRODUCTION_URL, NEXT_PUBLIC_DEVELOPMENT_URL } = env;

export default function Provider({ children }: ChildrenProps) {
  const [queryClient] = useState<QueryClient>(new QueryClient({}));
  const [trpcClient] = useState(
    trpc.createClient({
      links: [
        httpBatchLink({
          url: `${
            CONDITION === "development"
              ? NEXT_PUBLIC_DEVELOPMENT_URL
              : NEXT_PUBLIC_PRODUCTION_URL
          }/api/trpc`,
        }),
      ],
    })
  );

  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </trpc.Provider>
  );
}
