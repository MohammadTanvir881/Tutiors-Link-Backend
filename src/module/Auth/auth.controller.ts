import status from "http-status";
import config from "../../app/config";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { AuthServices } from "./auth.services";

const loginUser = catchAsync(async (req, res) => {
  console.log(req.body);
  const result = await AuthServices.loginUser(req.body);
  const { refreshToken, accessToken } = result;

  res.cookie("refreshToken", refreshToken, {
    secure: config.node_env === "production",
    httpOnly: true,
    sameSite: "none",
    maxAge: 1000 * 60 * 60 * 24 * 365,
  });

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "User is logged in succesfully!",
    data: {
      accessToken,
      refreshToken,
    },
  });
});

const refreshToken = catchAsync(async (req, res) => {
  const { refreshToken } = req.cookies;
  console.log(refreshToken)
  const result = await AuthServices.refreshToken(refreshToken);

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Access token is retrieved succesfully!",
    data: result,
  });
});

export const AuthControllers = {
  loginUser,
  refreshToken,
};
