import { z } from "zod";

export const createStudentValidationSchema = z.object({
  body: z.object({
    password: z.string().max(20),
    student: z.object({
      name: z.string().min(1, "Name is required"),
      email: z.string().email("Invalid email address"),
      gender: z.enum(["male", "female", "other"]),
      dateOfBirth: z.string().optional(),
      contactNo: z.string().min(1, "Contact number is required"),
      emergencyContactNo: z
        .string()
        .min(1, "Emergency contact number is required"),
      bloodGroup: z
        .enum(["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"])
        .optional(),
      presentAddress: z.string().min(1, "Present address is required"),
      permanentAddress: z.string().min(1, "Permanent address is required"),
      profileImg: z
        .string()
        .url("Profile image must be a valid URL")
        .optional(),
      coverImg: z.string().url("Cover image must be a valid URL").optional(),
      isDeleted: z.boolean(),
    }),
  }),
});

const updateStudentValidationSchema = z.object({
  body: z.object({
    name: z.string().min(1, "Name is required"),
    gender: z.enum(["male", "female", "other"]),
    dateOfBirth: z.string().optional(),
    contactNo: z.string().min(1, "Contact number is required"),
    emergencyContactNo: z
      .string()
      .min(1, "Emergency contact number is required"),
    bloodGroup: z
      .enum(["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"])
      .optional(),
    presentAddress: z.string().min(1, "Present address is required"),
    permanentAddress: z.string().min(1, "Permanent address is required"),
    profileImg: z.string().url("Profile image must be a valid URL").optional(),
    coverImg: z.string().url("Cover image must be a valid URL").optional(),
  }),
});

export const studentValidation = {
  createStudentValidationSchema,
  updateStudentValidationSchema,
};
