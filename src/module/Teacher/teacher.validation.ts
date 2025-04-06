import { z } from "zod";

export const createTeacherValidationSchema = z.object({
  body: z.object({
    password: z.string().max(20),
    teacher: z.object({
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
      designation: z.string().min(1, "Designation is required"),
      bio: z.string().min(1, "Bio is required"),
      subjects: z
        .array(
          z.enum([
            "Physics",
            "Mathematics",
            "Higher Mathematics",
            "Chemistry",
            "Biology",
            "Statistics",
            "Logic",
            "Sociology",
            "Psychology",
            "Islamic History",
            "Islamic Studies",
            "Computer Science",
            "Bangla 1st Paper (HSC)",
            "Bangla 2nd Paper (HSC)",
            "English 1st Paper (HSC)",
            "English 2nd Paper (HSC)",
            "Accounting (HSC)",
            "Management",
            "Marketing",
            "Finance, Banking & Insurance",
          ])
        )
        .nonempty("At least one subject is required"),
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

export const teacherValidation = {
  createTeacherValidationSchema,
};
