import { Types } from "mongoose";

export type TStudent = {
  name: string;
  email: string;
  user: Types.ObjectId;
  gender: "male" | "female" | "other";
  dateOfBirth?: string;
  contactNo: string;
  emergencyContactNo: string;
  bloodGroup?: "A+" | "A-" | "B+" | "B-" | "AB+" | "AB-" | "O+" | "O-";
  presentAddress: string;
  permanentAddress: string;
  profileImg?: string;
  coverImg?: string;
  isDeleted?: boolean;
};
