import { Router } from "express";
import validateRequest from "../../utils/validateRequest";
import { userValidation } from "../user/user.validation";
import { UserController } from "../user/user.controller";
import { AuthValidation } from "./auth.validation";
import { AuthController } from "./auth.controller";

const route = Router();

route.post(
  "/register",
  // validateRequest(userValidation.createUserValidationSchema),
  UserController.createUser
);

route.post(
  "/login",
  validateRequest(AuthValidation.loginValidationSchema),
  AuthController.loginUser
);

export const AuthRoute = route;
