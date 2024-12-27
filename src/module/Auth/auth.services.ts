import bcrypt from "bcrypt";
import AppError from "../../app/Error/AppError";
import { User } from "../user/user.model";
import { ILoginUser } from "./auth.interface";
import { createToken } from "./auth.ulties";
import config from "../../app/config";

const loginUser = async (payload: ILoginUser) => {
  const user = await User.findOne({ email: payload?.email }).select("+password");
  // console.log(user);
  if (!user) {
    throw new AppError(404, "User Not Found");
  }

  // check if the user is blocked deleted
  const isBlocked = user.isBlocked;
  if (isBlocked) {
    throw new AppError(500, "This user is Blocked");
  }

  // check the password
  const isPasswordMatched = await bcrypt.compare(
    payload?.password,
    user?.password
  );

  if (!isPasswordMatched) {
    throw new AppError(500, "Wrong Password");
  }

  // jwt Access Token
  const jwtPayload = {
    userEmail: user?.email,
    role: user?.role,
    _id : user?._id
  };

  // const AccessToken = createToken(
  //   jwtPayload,
  //   config.Access_Token_Secret as string,
  //   config.Access_Token_ExpireIn as string
  // );
  const token = createToken(
    jwtPayload,
    config.Access_Token_Secret as string,
    config.Access_Token_ExpireIn as string
  );
 
  return {
    // AccessToken,
    token
  };
};
export const AuthServices = {
  loginUser,
};
