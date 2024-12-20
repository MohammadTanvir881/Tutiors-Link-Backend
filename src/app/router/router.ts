import { Router } from "express";
import { AuthRoute } from "../../module/Auth/auth.route";
import { BlogRoute } from "../../module/Blogs/blogs.route";
import { AdminRoute } from "../../module/Admin/admin.route";

const router = Router();

const moduleRoutes = [
  {
    path: "/auth",
    route: AuthRoute,
  },
  {
    path: "/blogs",
    route: BlogRoute,
  },
  {
    path: "/admin",
    route: AdminRoute,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
