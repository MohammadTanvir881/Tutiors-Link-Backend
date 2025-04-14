import { Router } from "express";
import { TeacherControllers } from "./teacher.controller";
import { teacherValidation } from "./teacher.validation";
import auth from "../Auth/auth";
import { USER_ROLE } from "../User/user.constants";
import validateRequest from "../../utils/validateRequest";

const router = Router();
// get all teacher
router.get("/", TeacherControllers.getAllTeacher);

// get single teacher
router.get("/:id", TeacherControllers.getSingleTeacher);

//update teacher
router.patch(
  "/:id",
  auth("teacher"),
  validateRequest(teacherValidation.updateTeacherValidationSchema),
  TeacherControllers.UpdateTeacher
);

// Update Hourly Rate
router.patch(
  "/hourlyRate/:id",
  auth(USER_ROLE.teacher),
  validateRequest(teacherValidation.hourlyRateValidationSchema),
  TeacherControllers.updateHourlyRate
);

// turn on availability status
router.patch(
  "/avabilityStatusOn/:id",
  auth(USER_ROLE.teacher),
  TeacherControllers.turnOnAvabilityStatus
);

// turn off availability status
router.patch(
  "/avabilityStatusOf/:id",
  auth(USER_ROLE.teacher),
  TeacherControllers.turnOfAvabilityStatus
);

export const TeacherRoutes = router;
