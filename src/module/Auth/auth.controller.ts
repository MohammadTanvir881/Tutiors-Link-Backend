import catchAsync from "../../utils/catchAsync";
import { AuthServices } from "./auth.services";

const loginUser = catchAsync(async(req,res)=>{
    const result = await AuthServices.loginUser(req.body);
    res.status(200).json({
        success: true,
        message: "User login successfully",
        statusCode: 201,
        data: result,
      });
})

export const AuthController = {
    loginUser
}