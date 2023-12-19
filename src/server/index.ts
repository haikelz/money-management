import { initTRPC } from "@trpc/server";
import { z } from "zod";
import { deleteData, getData, patchData, postData } from "~features/crud";

const t = initTRPC.create();

export const router = t.router;
export const publicProcedure = t.procedure;

export const appRouter = router({
  get: publicProcedure.query(async () => {
    const response = await getData();
    return response;
  }),

  post: publicProcedure
    .input(
      z.object({
        createdAt: z.string(),
        email: z.string(),
        username: z.string(),
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
});

export type AppRouter = typeof appRouter;
