import { Types } from "mongoose";
import { IBlogModel } from "./blogs.interface";
import { BlogModel } from "./blogs.model";
import AppError from "../../app/Error/AppError";
import { ObjectId } from "mongodb";

const createBlogIntoDb = async (
  user: { userEmail: string; role: string; _id: string },
  payload: IBlogModel
) => {
  payload.author = new Types.ObjectId(user._id);
  const result = await BlogModel.create(payload);
  return result;
};

const getAllBlogs = async (query: Record<string, unknown>) => {
  // console.log("baseQuery", query);
  const queryObject = { ...query };

  let search = "";
  const blogSearchableFields = ["title", "content"];
  if (query?.search) {
    search = query?.search as string;
  }

  const searchQuery = BlogModel.find({
    $or: [
      {
        $or: blogSearchableFields.map((field) => ({
          [field]: { $regex: search, $options: "i" },
        })),
      },
    ],
  });

  // FILTERING fUNCTIONALITY:
  const excludeFields = ["search", "sortBy", "sortOrder"];
  excludeFields.forEach((el) => delete queryObject[el]);
  // console.log("before filter", queryObject);
  if (queryObject.filter) {
    queryObject.author = queryObject.filter;
    delete queryObject.filter; // Remove `filter` key
  }
  const filterQuery = searchQuery.find(queryObject);

  //Shorting Functionality
  const order = query.sortOrder === "asc" ? 1 : -1;
  // Construct the sort object
  const sortOptions: { [key: string]: 1 | -1 } = {};
  if (typeof query.sortBy === "string") {
    sortOptions[query.sortBy] = order;
  }

  const result = await filterQuery.sort(sortOptions).populate("author");
  return result;

  // const result = await BlogModel.find().populate("author");
  // return result
};

const updateBlogIntoDb = async (
  id: string,
  payload: Partial<IBlogModel>,
  user: Record<string, unknown>
) => {
  const blog = await BlogModel.findById(id);
  if(!blog){
    throw new AppError(
      400,
      "Blog Not Found"
    );
  }
  const authorId = blog?.author;
  const userId = new ObjectId(user._id as string);
  if (!(authorId as ObjectId).equals(userId)) {
    throw new AppError(
      500,
      "This is not your blog , You cant update this blog"
    );
  }
  const result = await BlogModel.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  }).populate("author");

  return result;
};

const deleteBlogsFromDb = async (
  id: string,
  user: Record<string, unknown>
) => {
    const blog = await BlogModel.findById(id);
    if(!blog){
      throw new AppError(
        400,
        "Blog Not Found"
      );
    }
    const authorId = blog?.author;
    const userId = new ObjectId(user._id as string);
    if (!(authorId as ObjectId).equals(userId)) {
      throw new AppError(
        500,
        "This is not your blog , You cant delete this blog"
      );
    }
    const result = await BlogModel.findByIdAndUpdate(id, {isDeleted : true}, {
      new: true,
      runValidators: true,
    });
  
    return result;
};

export const BlogServices = {
  createBlogIntoDb,
  getAllBlogs,
  updateBlogIntoDb,
  deleteBlogsFromDb,
};
