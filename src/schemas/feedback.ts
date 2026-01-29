import z from "zod";

export const addFeedbackSchema = z.object({
  title: z
    .string()
    .max(20, "Title must be not more than 20 characters")
    .min(3, "Title must be at least 3 characters"),
  description: z
    .string()
    .min(8, "Description must be at least 8 characters")
    .max(500, "Description must be not more than 500 characters"),
});

export type AddFeedbackInput = z.infer<typeof addFeedbackSchema>;
