import { z } from "zod";

export const addDataSchema = z.object({
  amount: z
    .string()
    .min(1)
    .regex(/^[^+-]*\d+$/gi, { message: "Amount must be positive value" }),
  description: z.string().min(1),
});

export const editDataSchema = z.object({
  amount: z
    .string()
    .min(1)
    .regex(/^[^+-]*\d+$/gi, { message: "Amount must be positive value" }),
  description: z.string().min(1),
});

export const signInSchema = z.object({
  username: z
    .string()
    .min(1)
    .regex(/[A-Za-z0-9]/gi, {
      message: "Username must not include special character!",
    }),
  password: z
    .string()
    .min(1)
    .regex(/[A-Za-z0-9]/gi, {
      message: "Password must not include special character!",
    }),
});
