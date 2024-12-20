import { z } from "zod";

// Zod validation schema for Blog
export const createBlogValidationSchema = z.object({
  body: z.object({
    title: z
      .string({
        required_error: "Title is required",
      })
      .min(1, "Title cannot be empty"),
    content: z
      .string({
        required_error: "Content is required",
      })
      .min(1, "Content cannot be empty"),
    isPublished: z.boolean().optional().default(true),
  }),
});
export const updateBlogValidationSchema = z.object({
  body: z.object({
    title: z
      .string({
        required_error: "Title is required",
      })
      .min(1, "Title cannot be empty").optional(),
    content: z
      .string({
        required_error: "Content is required",
      })
      .min(1, "Content cannot be empty").optional(),
    isPublished: z.boolean().optional().default(true).optional(),
  }),
});

export const blogValidation = {
  createBlogValidationSchema,
  updateBlogValidationSchema,
};
