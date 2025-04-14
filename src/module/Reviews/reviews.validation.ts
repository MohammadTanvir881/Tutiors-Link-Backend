import { z } from "zod";

export const reviewValidationSchema = z.object({
  body: z.object({
    comment: z.string().min(1, "Comment is required"),
    rating: z
      .number()
      .min(1, "Rating must be between 1 and 5")
      .max(5, "Rating must be between 1 and 5"),
  }),
});

export const reviewValidation = {
  reviewValidationSchema,
};
