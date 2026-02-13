import { Router } from "express";
import PlanController from "../controllers/plan.controller.js";
import authController from "../controllers/auth.controller.js";
import roleMiddleware from "../middlewares/roleMiddleware.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const planRoutes = Router();

planRoutes.get("/", authMiddleware, PlanController);

planRoutes.post(
  "/",
  authMiddleware,
  roleMiddleware("ADMIN"),
  PlanController.create,
);

export default planRoutes;
