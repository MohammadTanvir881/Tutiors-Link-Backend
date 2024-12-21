import { JwtPayload } from "jsonwebtoken";
import catchAsync from "../../utils/catchAsync";
import { BlogServices } from "./blog.services";
import AppError from "../../app/Error/AppError";

const createBlog = catchAsync(async (req, res) => {
  // console.log("from blog controller", req.user);

  const result = await BlogServices.createBlogIntoDb(req.user, req.body);
  res.status(200).json({
    success: true,
    message: "Blogs Created successfully",
    statusCode: 200,
    data: result,
  });
});

const getAllBlogs = catchAsync(async (req, res) => {
  const query = req.query;
  // console.log("from controller", query);
  const result = await BlogServices.getAllBlogs(query);
  res.status(200).json({
    success: true,
    message: "Blogs Retrieved successfully",
    statusCode: 200,
    data: result,
  });
});

const updateBlogs = catchAsync(async (req, res) => {
  // console.log(req.user)
  const { id } = req.params;
  const result = await BlogServices.updateBlogIntoDb(id, req.body, req.user);
  // console.log("from Update Blogs" , result)
  if (!result) {
    throw new AppError(500, "Sorry This is not your content");
  }
  res.status(200).json({
    success: true,
    message: "Blogs Updated successfully",
    statusCode: 200,
    data: result,
  });
});

const deleteBlogs = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await BlogServices.deleteBlogsFromDb(id, req.user);
  res.status(200).json({
    success: true,
    message: "Blogs deleted successfully",
    statusCode: 200,
  });
});

export const BlogController = {
  createBlog,
  getAllBlogs,
  updateBlogs,
  deleteBlogs,
};
