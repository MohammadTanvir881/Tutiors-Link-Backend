import { Types } from "mongoose";

export type TGender = "male" | "female" | "other";
export type TBloodGroup =
  | "A+"
  | "A-"
  | "B+"
  | "B-"
  | "AB+"
  | "AB-"
  | "O+"
  | "O-";

export type TSubject =
  // Class 11-12 (HSC - Intermediate level)
  | "Physics"
  | "Mathematics"
  | "Higher Mathematics"
  | "Chemistry"
  | "Biology"
  | "Statistics"
  | "Logic"
  | "Sociology"
  | "Psychology"
  | "Islamic History"
  | "Islamic Studies"
  | "Computer Science"
  | "Bangla 1st Paper (HSC)"
  | "Bangla 2nd Paper (HSC)"
  | "English 1st Paper (HSC)"
  | "English 2nd Paper (HSC)"
  | "Accounting (HSC)"
  | "Management"
  | "Marketing"
  | "Finance, Banking & Insurance";

export type TTeacher = {
  name: string;
  email: string;
  gender: TGender;
  dateOfBirth?: Date;
  user: Types.ObjectId;
  contactNo: string;
  emergencyContactNo: string;
  bloodGroup?: TBloodGroup;
  designation: string;
  bio: string;
  subjects: TSubject[];
  presentAddress: string;
  permanentAddress: string;
  profileImg?: string;
  coverImg?: string;
  avability: boolean;
  hourlyRate?: number;
  isDeleted: boolean;
  reviews: { rating: number }[];
};
