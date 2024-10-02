import { z } from "zod";
import { patterns } from "./constants";

export const registerSchema = z
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
      .min(8, { message: "Password is required" })
      .refine((text) => patterns.password.test(text), {
        message:
          "Password must be at least 8 characters long, contain one uppercase letter, one lowercase letter, one number, and one special character",
      }),
    confirmPassword: z.string(),
    terms: z.boolean().refine((val) => val === true, {
      message: "You must accept the terms and privacy policy",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Confirm password must match password",
    path: ["confirmPassword"],
  });

export type RegisterSchema = z.infer<typeof registerSchema>;

export const loginSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, { message: "Email is required" })
    .refine((text) => patterns.email.test(text), {
      message: "Email not valid",
    }),
  password: z
    .string()
    .min(8, { message: "Password is required" })
    .refine((text) => patterns.password.test(text), {
      message: "Password is not correct",
    }),
});

export type LoginSchema = z.infer<typeof loginSchema>;
