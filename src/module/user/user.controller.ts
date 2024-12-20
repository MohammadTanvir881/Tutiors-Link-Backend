import catchAsync from "../../utils/catchAsync";
import { UserServices } from "./user.services";

const createUser = catchAsync(async (req, res) => {
  const result = await UserServices.createUserIntoDb(req.body);
  const { name, email, _id } = result;
  res.status(200).json({
    success: true,
    message: "User registered successfully",
    statusCode: 201,
    data: {
      _id,
      name,
      email,
    },
  });
});

export const UserController = {
  createUser,
};
