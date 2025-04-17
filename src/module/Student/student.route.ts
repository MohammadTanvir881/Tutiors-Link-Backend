import express from "express";
import { StudentController } from "./student.controller";
import auth from "../Auth/auth";
import validateRequest from "../../utils/validateRequest";
import { studentValidation } from "./student.validation";

const router = express.Router();

// get all student
router.get("/", StudentController.getAllStudentFromDB);
// get single student
router.get("/:id", StudentController.getSingleStudentFromDB);
// // get single student by userId
// router.get("/studentUserId/:id", StudentController.getSingleStudentFromDB);
// // update student data
router.patch(
  "/:id",
  auth("student"),
  validateRequest(studentValidation.updateStudentValidationSchema),
  StudentController.UpdateStudent
);

export const StudentRoutes = router;
