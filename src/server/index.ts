import { initTRPC } from "@trpc/server";
import { z } from "zod";
import { deleteData, patchData, postData } from "~features/crud";
import { createNewAccount } from "~features/new-account";

const t = initTRPC.create();

export const router = t.router;
export const publicProcedure = t.procedure;

export const appRouter = router({
  post: publicProcedure
    .input(
      z.object({
        created_at: z.string(),
        email: z.string(),
        name: z.string(),
        type: z.union([z.literal("Income"), z.literal("Expense")]),
        amount: z.number(),
        description: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      await postData(input);
    }),

  patch: publicProcedure
    .input(
      z.object({
        id: z.string(),
        data: z.object({
          type: z.union([z.literal("Income"), z.literal("Expense")]),
          amount: z.number(),
          description: z.string(),
        }),
      })
    )
    .mutation(async ({ input }) => {
      await patchData(input.id, input.data);
    }),

  delete: publicProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ input }) => {
      await deleteData(input.id);
    }),

  createNewAccount: publicProcedure
    .input(
      z.object({
        email: z.string(),
        name: z.string(),
        password: z.string(),
        image: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      await createNewAccount({
        email: input.email,
        name: input.name,
        password: input.password,
        image: input.image,
      });
    }),
});

export type AppRouter = typeof appRouter;
