import { Router } from "express";
import { TeacherControllers } from "./teacher.controller";
import validateRequest from "../../utils/validateRequest";
import { teacherValidation } from "./teacher.validation";
import auth from "../Auth/auth";
import { USER_ROLE } from "../User/user.constants";

const router = Router();
//! get all teacher
router.get("/", TeacherControllers.getAllTeacher);

//! Update Hourly Rate
router.patch(
  "/hourlyRate/:id",
  auth(USER_ROLE.teacher),
  validateRequest(teacherValidation.hourlyRateValidationSchema),
  TeacherControllers.updateHourlyRate
);

//! turn on availability status
router.patch(
  "/avabilityStatusOn/:id",
  auth(USER_ROLE.teacher),
  TeacherControllers.turnOnAvabilityStatus
);

//! turn off availability status
router.patch(
  "/avabilityStatusOf/:id",
  auth(USER_ROLE.teacher),
  TeacherControllers.turnOfAvabilityStatus
);

export const TeacherRoutes = router;
