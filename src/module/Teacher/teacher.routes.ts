import { Router } from "express";
import { TeacherControllers } from "./teacher.controller";


const router = Router();

router.get(
  "/",
  TeacherControllers.getAllTeacher
);

export const TeacherRoutes = router;
