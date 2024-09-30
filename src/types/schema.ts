import { z } from "zod";
import { patterns } from "./constants";

export const schema = z
  .object({
    username: z
      .string()
      .trim()
      .min(3, { message: "Username must be at least 3 characters long" })
      .max(15, { message: "Username cannot exceed 15 characters" }),
    firstName: z
      .string()
      .trim()
      .min(2, { message: "First name must be at least 2 characters long" })
      .max(15, { message: "First Name cannot exceed 15 characters" }),
    lastName: z
      .string()
      .trim()
      .min(3, { message: "Last name must be at least 3 characters long" })
      .max(15, { message: "First Name cannot exceed 15 characters" }),
    email: z
      .string()
      .trim()
      .min(1, { message: "Email is required" })
      .refine((text) => patterns.email.test(text), {
        message: "Email not valid",
      }),
    password: z
      .string()
      .min(6, { message: "Password must be at least 6 characters long" }),
    confirmPassword: z.string(),
    terms: z.boolean().refine((val) => val === true, {
      message: "You must accept the terms and privacy policy",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Confirm password must match password",
    path: ["confirmPassword"],
  });

export type Schema = z.infer<typeof schema>;
