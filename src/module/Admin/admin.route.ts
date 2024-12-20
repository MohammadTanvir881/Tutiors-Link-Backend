import { Router } from "express";
import auth from "../Auth/auth";
import { USER_ROLE } from "../user/user.constant";
import { AdminController } from "./admin.controller";

const route = Router();

route.patch("/users/:userId/block" , auth(USER_ROLE.admin), AdminController.blockUser);
route.delete("/blogs/:id" , auth(USER_ROLE.admin) , AdminController.deleteBlog)


export const AdminRoute = route