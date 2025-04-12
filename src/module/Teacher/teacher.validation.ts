import { z } from "zod";

const createTeacherValidationSchema = z.object({
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
      bloodGroup: z.enum(["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"]),
      district: z.enum([
        "bagerhat",
        "bandarban",
        "barisal",
        "barguna",
        "bhola",
        "bogura",
        "brahmanbaria",
        "chapai nawabganj",
        "chandpur",
        "chattogram",
        "chuadanga",
        "cox's bazar",
        "cumilla",
        "dinajpur",
        "dhaka",
        "faridpur",
        "feni",
        "gaibandha",
        "gazipur",
        "gopalganj",
        "habiganj",
        "jamalpur",
        "jashore",
        "jhenaidah",
        "jhalokathi",
        "joypurhat",
        "khagrachari",
        "khulna",
        "kishoreganj",
        "kurigram",
        "kushtia",
        "lakshmipur",
        "lalmonirhat",
        "madaripur",
        "magura",
        "manikganj",
        "meherpur",
        "moulvibazar",
        "munshiganj",
        "mymensingh",
        "naogaon",
        "narail",
        "narayanganj",
        "narsingdi",
        "natore",
        "netrokona",
        "nilphamari",
        "noakhali",
        "pabna",
        "panchagarh",
        "patuakhali",
        "pirojpur",
        "rajbari",
        "rajshahi",
        "rangamati",
        "rangpur",
        "satkhira",
        "shariatpur",
        "sherpur",
        "sirajganj",
        "sunamganj",
        "sylhet",
        "tangail",
        "thakurgaon",
      ]),
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

const updateTeacherValidationSchema = z.object({
  body: z.object({
    name: z.string().min(1, "Name is required").optional(),
    gender: z.enum(["male", "female", "other"]).optional(),
    dateOfBirth: z.string().optional(),
    contactNo: z.string().min(1, "Contact number is required").optional(),
    emergencyContactNo: z
      .string()
      .min(1, "Emergency contact number is required")
      .optional(),
    bloodGroup: z
      .enum(["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"])
      .optional(),
    district: z
      .enum([
        "bagerhat",
        "bandarban",
        "barisal",
        "barguna",
        "bhola",
        "bogura",
        "brahmanbaria",
        "chapai nawabganj",
        "chandpur",
        "chattogram",
        "chuadanga",
        "cox's bazar",
        "cumilla",
        "dinajpur",
        "dhaka",
        "faridpur",
        "feni",
        "gaibandha",
        "gazipur",
        "gopalganj",
        "habiganj",
        "jamalpur",
        "jashore",
        "jhenaidah",
        "jhalokathi",
        "joypurhat",
        "khagrachari",
        "khulna",
        "kishoreganj",
        "kurigram",
        "kushtia",
        "lakshmipur",
        "lalmonirhat",
        "madaripur",
        "magura",
        "manikganj",
        "meherpur",
        "moulvibazar",
        "munshiganj",
        "mymensingh",
        "naogaon",
        "narail",
        "narayanganj",
        "narsingdi",
        "natore",
        "netrokona",
        "nilphamari",
        "noakhali",
        "pabna",
        "panchagarh",
        "patuakhali",
        "pirojpur",
        "rajbari",
        "rajshahi",
        "rangamati",
        "rangpur",
        "satkhira",
        "shariatpur",
        "sherpur",
        "sirajganj",
        "sunamganj",
        "sylhet",
        "tangail",
        "thakurgaon",
      ])
      .optional(),
    designation: z.string().min(1, "Designation is required").optional(),
    bio: z.string().min(1, "Bio is required").optional(),
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
      .nonempty("At least one subject is required")
      .optional(),
    presentAddress: z.string().min(1, "Present address is required").optional(),
    permanentAddress: z
      .string()
      .min(1, "Permanent address is required")
      .optional(),
    profileImg: z
      .string()
      .url("Profile image must be a valid URL")
      .optional()
      .optional(),
    coverImg: z
      .string()
      .url("Cover image must be a valid URL")
      .optional()
      .optional(),
    hourlyRate: z.number().min(1).optional(),
    availability: z.boolean().optional(),
    isDeleted: z.boolean().optional(),
  }),
});

const hourlyRateValidationSchema = z.object({
  body: z.object({
    hourlyRate: z
      .number({ required_error: "Hourly rate is required" })
      .min(0, "Hourly rate must be a positive number"),
  }),
});

export const teacherValidation = {
  createTeacherValidationSchema,
  updateTeacherValidationSchema,
  hourlyRateValidationSchema,
};
