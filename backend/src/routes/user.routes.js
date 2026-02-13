import { Router } from "express";

import UserController from "../controllers/user.controller";
import authMiddleware from "../middlewares/authMiddleware";

const userRoutes = Router();

userRoutes.post("/", UserController.create);
userRoutes.get("/profile", authMiddleware, UserController.getUser);

export default userRoutes;
