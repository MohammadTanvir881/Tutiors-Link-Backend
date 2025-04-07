import { Types } from "mongoose";

export type TReview = {
  teacher: Types.ObjectId;
  student: Types.ObjectId;
  comment: string;
  rating: number;
};
