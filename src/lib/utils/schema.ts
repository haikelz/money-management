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
  name: z
    .string()
    .min(1)
    .regex(/^[A-Za-z0-9\-_\.]*$/gi, {
      message: "Username must not include any special character!",
    }),
  password: z
    .string()
    .min(1)
    .regex(/^[A-Za-z0-9\-_\.]*$/gi, {
      message: "Password must not include any special character!",
    }),
});

export const signUpSchema = z.object({
  email: z.string().email().min(1),
  username: z
    .string()
    .min(1)
    .regex(/^[A-Za-z0-9\-_\.]*$/gi, {
      message: "Username must not include any special character!",
    }),
  password: z
    .string()
    .min(1)
    .regex(/^[A-Za-z0-9\-_\.]*$/gi, {
      message: "Password must not include any special character!",
    }),
});
