import { Router } from "express";
import validateRequest from "../../utils/validateRequest";
import { AuthValidation } from "./auth.validation";
import { AuthControllers } from "./auth.controller";


const router = Router();

router.post(
  '/login',
  validateRequest(AuthValidation.loginValidationSchema),
  AuthControllers.loginUser,
);

router.post(
  '/refresh-token',
  validateRequest(AuthValidation.refreshTokenValidationSchema),
  AuthControllers.refreshToken,
);



export const AuthRoutes = router;
