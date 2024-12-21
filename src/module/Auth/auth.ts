import { NextFunction, Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import { TUserRole } from "../user/user.interface";
import AppError from "../../app/Error/AppError";
import jwt, { JwtPayload } from "jsonwebtoken";
import config from "../../app/config";
import { User } from "../user/user.model";

const auth = (...requiredRoles: TUserRole[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const tokenFromFrontend = req.headers.authorization;
    if(!tokenFromFrontend){
      throw new AppError(401, "Unauthorized Access");
    }
    const tokenModified: string[] = (tokenFromFrontend as string)
      ?.toString()
      .split(" ");
    // console.log(tokenModified);
    const token = tokenModified[1];
    // console.log("from auth", token);
    if (!token) {
      throw new AppError(401, "Unauthorized Access");
    }
    // check the token is valid
    const decoded = jwt.verify(
      token,
      config.Access_Token_Secret as string
    ) as JwtPayload;

    const { userEmail, role } = decoded;

    const user = await User.findOne({ email: userEmail });
    if (!user) {
      throw new AppError(404, "User Not Found");
    }

    // check if the user is blocked 
    const isBlocked = user.isBlocked;
    if (isBlocked) {
      throw new AppError(500, "This user is Blocked");
    }

    if (requiredRoles && !requiredRoles.includes(role)) {
      throw new AppError(401, "Unauthorized Access");
    }

    req.user = decoded as JwtPayload;

    next();
  });
};

export default auth;
