import { z } from "zod";

export const loginSchema = z.object({
  email: z
    .string({ error: "Email is required" })
    .email("Invalid email address")
    .trim(),

  password: z
    .string({ error: "Password is required" })
    .min(1, "Password is required"),
});

export const signupSchema = z.object({
  name: z
    .string({ error: "Name is required" })
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name cannot exceed 50 characters")
    .trim(),

  email: z
    .string({ error: "Email is required" })
    .email("Invalid email address")
    .trim(),

  password: z
    .string({ error: "Password is required" })
    .min(8, "Password must be at least 8 characters")
    .regex(/[A-Z]/, "Must contain at least one uppercase letter")
    .regex(/[a-z]/, "Must contain at least one lowercase letter")
    .regex(/[0-9]/, "Must contain at least one number")
    .regex(/[^A-Za-z0-9]/, "Must contain at least one special character"),

  confirmPassword: z
    .string({ error: "Please confirm your password" })
    .min(1, "Please confirm your password"),

  phone: z
    .string()
    .regex(/^\+?[1-9]\d{1,14}$/, "Invalid phone number")
    .optional()
    .or(z.literal("")),

  country: z
    .string()
    .min(2, "Country must be at least 2 characters")
    .optional()
    .or(z.literal("")),

  gender: z
    .enum(["male", "female", "other", "prefer-not-to-say"])
    .optional(),

  bloodGroup: z
    .enum(["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"])
    .optional(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

export const forgotPasswordSchema = z.object({
  email: z
    .string({ error: "Email is required" })
    .email("Invalid email address")
    .trim(),
});

export const resetPasswordSchema = z.object({
  newPassword: z
    .string({ error: "Password is required" })
    .min(8, "Password must be at least 8 characters")
    .regex(/[A-Z]/, "Must contain at least one uppercase letter")
    .regex(/[a-z]/, "Must contain at least one lowercase letter")
    .regex(/[0-9]/, "Must contain at least one number")
    .regex(/[^A-Za-z0-9]/, "Must contain at least one special character"),

  confirmPassword: z
    .string({ error: "Please confirm your password" })
    .min(1, "Please confirm your password"),
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

export const updateProfileSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name cannot exceed 50 characters")
    .optional(),

  phone: z
    .string()
    .regex(/^\+?[1-9]\d{1,14}$/, "Invalid phone number")
    .optional()
    .or(z.literal("")),

  country: z
    .string()
    .min(2, "Country must be at least 2 characters")
    .optional()
    .or(z.literal("")),

  gender: z
    .enum(["male", "female", "other", "prefer-not-to-say"])
    .optional(),

  bloodGroup: z
    .enum(["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"])
    .optional(),

  medicalHistory: z
    .string()
    .max(1000, "Cannot exceed 1000 characters")
    .optional(),
});

export type LoginFormData       = z.infer<typeof loginSchema>;
export type SignupFormData       = z.infer<typeof signupSchema>;
export type ForgotPasswordData  = z.infer<typeof forgotPasswordSchema>;
export type ResetPasswordData   = z.infer<typeof resetPasswordSchema>;
export type UpdateProfileData   = z.infer<typeof updateProfileSchema>;