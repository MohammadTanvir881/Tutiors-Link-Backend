import { Types } from "mongoose";

export interface IBlogModel {
  title: string;
  content: string;
  author: Types.ObjectId;
  isPublished: boolean;
  isDeleted?: boolean;
}
