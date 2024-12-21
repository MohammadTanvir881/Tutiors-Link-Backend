import AppError from "../../app/Error/AppError";
import { BlogModel } from "../Blogs/blogs.model";
import { User } from "../user/user.model";

const blockAdminIntoDb = async (userId: string) => {
  const user = await User.findById(userId);
  if (!user) {
    throw new AppError(404, "Blog Not Found");
  }
  // console.log("from admin services", user);
  const userStatus = user.isBlocked;
  if (userStatus) {
    throw new AppError(500, "This User Is Already Blocked");
  }
  const result = await User.findByIdAndUpdate(
    userId,
    { isBlocked: true },
    { new: true, runValidators: true }
  );
  return result;
};

const deleteBlogFromDb = async (id: string) => {
  const blog = await BlogModel.findById(id);
  if (!blog) {
    throw new AppError(404, "Blog Not Found");
  }
  // console.log("from admin services", blog);
  const deletedStatus = blog.isDeleted;
  if (deletedStatus) {
    throw new AppError(500, "This Blog Is Already Deleted");
  }
  const result = await BlogModel.findByIdAndUpdate(
    id,
    { isDeleted: true },
    { new: true, runValidators: true }
  );
  return result;
};

export const AdminServices = {
  blockAdminIntoDb,
  deleteBlogFromDb,
};
