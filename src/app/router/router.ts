import { Router } from "express";
import { UserRoutes } from "../../module/User/user.routes";
import { AuthRoutes } from "../../module/Auth/auth.route";
import { ReviewRoutes } from "../../module/Reviews/reviews.route";
import { TeacherRoutes } from "../../module/Teacher/teacher.routes";
import { BookingRoutes } from "../../module/Bookings/bookings.route";
import { PaymentRoutes } from "../../module/Payment/payment.route";
import { StudentRoutes } from "../../module/Student/student.route";
import { EarningsRoutes } from "../../module/Earnings/earnings.route";

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
    path: "/students",
    route: StudentRoutes,
  },
  {
    path: "/auth",
    route: AuthRoutes,
  },
  {
    path: "/reviews",
    route: ReviewRoutes,
  },
  {
    path: "/bookings",
    route: BookingRoutes,
  },
  {
    path: "/payment",
    route: PaymentRoutes,
  },
  {
    path: "/earnings",
    route: EarningsRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
