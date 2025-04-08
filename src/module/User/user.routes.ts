import { Router } from "express";
import validateRequest from "../../utils/validateRequest";
import { studentValidation } from "../Student/student.validation";
import { UserControllers } from "./user.controller";
import { teacherValidation } from "../Teacher/teacher.validation";


const router = Router();

router.post(
  '/create-student',
  validateRequest(studentValidation.createStudentValidationSchema),
  UserControllers.createStudent,
);

router.post(
  '/create-teacher',
  validateRequest(teacherValidation.createTeacherValidationSchema),
  UserControllers.createTeacher,
);

// router.post(
//   '/create-admin',
//   auth(USER_ROLE.superAdmin, USER_ROLE.admin),
//   upload.single('file'),
//   (req: Request, res: Response, next: NextFunction) => {
//     req.body = JSON.parse(req.body.data);
//     next();
//   },
//   validateRequest(createAdminValidationSchema),
//   UserControllers.createAdmin,
// );

// router.post(
//   '/change-status/:id',
//   auth(USER_ROLE.superAdmin, USER_ROLE.admin),
//   validateRequest(UserValidation.changeStatusValidationSchema),
//   UserControllers.changeStatus,
// );

// router.get(
//   '/me',
//   auth(
//     USER_ROLE.superAdmin,
//     USER_ROLE.admin,
//     USER_ROLE.faculty,
//     USER_ROLE.student,
//   ),
//   UserControllers.getMe,
// );

export const UserRoutes = router;
