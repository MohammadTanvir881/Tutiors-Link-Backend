import { z } from "zod";

export const userSchema = z.object({
  pasword: z
    .string({
      invalid_type_error: "Password must be string",
    })
    .max(20, { message: "Password can not be more than 20 characters" })
    .optional(),
});
