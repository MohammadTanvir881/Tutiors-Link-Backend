import { Router } from "express";
import { UserRoutes } from "../../module/User/user.routes";
import { AuthRoutes } from "../../module/Auth/auth.route";
import { ReviewRoutes } from "../../module/Reviews/reviews.route";
import { TeacherRoutes } from "../../module/Teacher/teacher.routes";

const router = Router();

const moduleRoutes = [
  {
    path: "/users",
    route: UserRoutes,
  },
  {
    path: "/teachers",
    route: TeacherRoutes,
  },
  {
    path: "/auth",
    route: AuthRoutes,
  },
  {
    path: "/reviews",
    route: ReviewRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
