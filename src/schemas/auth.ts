import z from "zod";

export const registerSchema = z
  .object({
    email: z.email("Enter a valid email"),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .max(30, "Password must be not more than 30 characters"),
    passwordConfirmation: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .max(30, "Password must be not more than 30 characters"),
  })
  .superRefine(({ passwordConfirmation, password }, ctx) => {
    if (passwordConfirmation !== password) {
      ctx.addIssue({
        code: "custom",
        message: "Password didn't match",
        path: ["passwordConfirmation"],
      });
    }
  });

export const loginSchema = z.object({
  email: z.email("Enter a valid email"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .max(30, "Password must be not more than 30 characters"),
});

export type RegisterInput = z.infer<typeof registerSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
