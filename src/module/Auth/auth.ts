import { NextFunction, Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import { TUserRole } from "../User/user.interface";
import AppError from "../../app/Error/AppError";
import status from "http-status";
import jwt, { JwtPayload } from "jsonwebtoken";
import config from "../../app/config";
import { User } from "../User/user.model";

const auth = (...requiredRoles: TUserRole[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const tokenFromFrontend = req.headers.authorization;
    if (!tokenFromFrontend) {
      throw new AppError(status.UNAUTHORIZED, "Unauthorized Access");
    }
    // console.log("from auth", token);
    if (!tokenFromFrontend) {
      throw new AppError(401, "Unauthorized Access");
    }
    // check the token is valid
    const decoded = jwt.verify(
      tokenFromFrontend,
      config.Access_Token_Secret as string
    ) as JwtPayload;

    const { userEmail, role, userId } = decoded;
    console.log({
      userEmail,
      role,
      userId,
    });

    const user = await User.findOne({ email: userEmail });
    if (!user) {
      throw new AppError(404, "User Not Found");
    }

    // check if the user is blocked
    const isBlocked = user.status === "blocked";
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
