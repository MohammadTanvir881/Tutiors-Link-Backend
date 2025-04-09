import { model, Schema } from "mongoose";
import { BloodGroup, Districts, Gender } from "./teacher.constant";
import { TTeacher } from "./teacher.interface";

const teacherSchema = new Schema<TTeacher>(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },

    gender: {
      type: String,
      enum: {
        values: Gender,
        message: "{VALUE} is not a valid gender",
      },
      required: [true, "Gender is required"],
    },
    dateOfBirth: { type: String },
    user: {
      type: Schema.Types.ObjectId,
      required: [true, "User id is required"],
      unique: true,
      ref: "User",
    },
    contactNo: { type: String, required: [true, "Contact number is required"] },
    emergencyContactNo: {
      type: String,
      required: [true, "Emergency contact number is required"],
    },
    bloodGroup: {
      type: String,
      enum: {
        values: BloodGroup,
        message: "{VALUE} is not a valid blood group",
      },
    },
    district: {
      type: String,
      enum: {
        values: Districts,
        message: "{VALUE} is not a valid district",
      },
    },
    designation: {
      type: String,
      required: [true, "Designation is required"],
    },
    bio: {
      type: String,
      required: [true, "Bio is required"],
    },
    subjects: {
      type: [String],
      enum: {
        values: [
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
        ],
        message: "{VALUE} is not a valid subject",
      },
    },

    presentAddress: {
      type: String,
      required: [true, "Present address is required"],
    },
    permanentAddress: {
      type: String,
      required: [true, "Permanent address is required"],
    },
    profileImg: {
      type: String,
      default: "",
      required: [true, "Profile image is required"],
    },
    coverImg: {
      type: String,
      default: "",
      required: [true, "Cover image is required"],
    },
    avability: {
      type: Boolean,
      default: false,
    },
    hourlyRate: {
      type: Number,
      default: 0,
      min: 0,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

teacherSchema.virtual("reviews", {
  ref: "Review", // the model to use
  localField: "_id", // find reviews where `teacher` is equal to `_id`
  foreignField: "teacher", // the key in Review schema that refers to the teacher
});

export const Teacher = model<TTeacher>("Teacher", teacherSchema);
