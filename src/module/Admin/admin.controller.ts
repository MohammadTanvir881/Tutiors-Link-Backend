import catchAsync from "../../utils/catchAsync";
import { AdminServices } from "./admin.services";

const blockUser = catchAsync(async (req, res) => {
  const { userId } = req.params;
  const result = await AdminServices.blockAdminIntoDb(userId);
  res.status(200).json({
    success: true,
    message: "User Blocked successfully",
    statusCode: 200,
  });
});

const deleteBlog = catchAsync(async (req, res) => {
    const {id} = req.params;
    const result = await AdminServices.deleteBlogFromDb(id)
    res.status(200).json({
        success: true,
        message: "Blog Deleted successfully",
        statusCode: 200,
      });
});

export const AdminController = {
  blockUser,
  deleteBlog,
};
