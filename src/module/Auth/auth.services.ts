/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import bcrypt from "bcryptjs";
import { User } from "../User/user.model";
import { TLoginUser } from "./auth.interface";
import AppError from "../../app/Error/AppError";
import { createToken, verifyToken } from "./auth.utlis";
import config from "../../app/config";
import status from "http-status";

const loginUser = async (payload: TLoginUser) => {
  const user = await User.findOne({ email: payload?.email }).select(
    "+password"
  );
  if (!user) {
    throw new AppError(404, "User Not Found");
  }

  // check if the user is blocked deleted
  const isBlocked = user.status === "blocked";
  if (isBlocked) {
    throw new AppError(500, "This user is Blocked");
  }

  if (user.isDeleted) {
    throw new AppError(status.FORBIDDEN, "This user is deleted !");
  }

  // check the password
  const isPasswordMatched = await bcrypt.compare(
    payload?.password,
    user?.password
  );

  if (!isPasswordMatched) {
    throw new AppError(500, "Wrong Password");
  }

  //create token and sent to the  client
  const jwtPayload = {
    userEmail: user?.email,
    role: user?.role,
    userId: user?._id.toString(),
  };

  const accessToken = createToken(
    jwtPayload,
    config.Access_Token_Secret as string,
    config.Access_Token_ExpireIn as string
  );

  const refreshToken = createToken(
    jwtPayload,
    config.Refresh_Token_Secret as string,
    config.Refresh_Token_ExpireIn as string
  );

  return {
    accessToken,
    refreshToken,
  };
};

const refreshToken = async (token: string) => {
  // checking if the given token is valid
  const decoded = verifyToken(token, config.Refresh_Token_Secret as string);

  const { userId, iat } = decoded;

  // console.log(userId, iat);

  // // checking if the user is exist
  const user = await User.findById(userId);

  if (!user) {
    throw new AppError(status.NOT_FOUND, "This user is not found !");
  }
  // checking if the user is already deleted
  const isDeleted = user?.isDeleted;

  if (isDeleted) {
    throw new AppError(status.FORBIDDEN, "This user is deleted !");
  }

  // checking if the user is blocked
  const userStatus = user?.status;

  if (userStatus === "blocked") {
    throw new AppError(status.FORBIDDEN, "This user is blocked ! !");
  }

  const jwtPayload = {
    role: user?.role,
    userId: user?._id.toString(),
  };

  const accessToken = createToken(
    jwtPayload,
    config.Access_Token_Secret as string,
    config.Access_Token_ExpireIn as string
  );

  return {
    accessToken,
  };
};

export const AuthServices = {
  loginUser,
  refreshToken,
};
