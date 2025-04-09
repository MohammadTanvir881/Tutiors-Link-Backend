import { Types } from "mongoose";
import { TBloodGroup, TDistrict, TGender, TSubject } from "./teacher.types";

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
  district: TDistrict;
  presentAddress: string;
  permanentAddress: string;
  profileImg?: string;
  coverImg?: string;
  availability: boolean;
  hourlyRate?: number;
  isDeleted: boolean;
  reviews: { rating: number }[];
  createdAt: Date;
};
