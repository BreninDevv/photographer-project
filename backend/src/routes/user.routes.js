import { Router } from "express";
import authMiddleware from "../middlewares/authMiddleware.js";
import UserController from "../controllers/user.controller.js";

const userRoutes = Router();

userRoutes.post("/", UserController.create);

userRoutes.get("/", authMiddleware, UserController.list);
userRoutes.get("/:id", authMiddleware, UserController.getUser);
userRoutes.put("/:id", authMiddleware, UserController.updateUser);
userRoutes.delete("/:id", authMiddleware, UserController.deleteUser);

export default userRoutes;
