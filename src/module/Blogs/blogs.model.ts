import { Schema, model } from "mongoose";
import { IBlogModel } from "./blogs.interface";

const blogsSchema = new Schema<IBlogModel>(
  {
    title: {
      type: String,
      required: [true, "Title is Required"],
    },
    content: {
      type: String,
      required: [true, "Content is Required"],
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    isPublished: {
      type: Boolean,
      default: true,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

blogsSchema.pre('find', function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

export const BlogModel = model<IBlogModel>("Blog", blogsSchema);
