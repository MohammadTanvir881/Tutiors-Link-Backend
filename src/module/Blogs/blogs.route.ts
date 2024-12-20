import { Router } from "express";
import auth from "../Auth/auth";
import { USER_ROLE } from "../user/user.constant";
import validateRequest from "../../utils/validateRequest";
import { blogValidation } from "./blogs.validation";
import { BlogController } from "./blogs.controller";

const route = Router();

route.post(
  "/",
  auth(USER_ROLE.admin, USER_ROLE.user),
  validateRequest(blogValidation.createBlogValidationSchema),
  BlogController.createBlog
);

route.get("/", BlogController.getAllBlogs);

route.patch(
  "/:id",
  auth(USER_ROLE.admin, USER_ROLE.user),
  validateRequest(blogValidation.updateBlogValidationSchema),
  BlogController.updateBlogs
);
route.delete(
  "/:id",
  auth(USER_ROLE.admin, USER_ROLE.user),
  BlogController.deleteBlogs
);

export const BlogRoute = route;
