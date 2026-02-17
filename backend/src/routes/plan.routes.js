import { Router } from "express";
import PlanController from "../controllers/plan.controller.js";
import { roleMiddleware } from "../middlewares/roleMiddleware.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const planRoutes = Router();

planRoutes.get("/", authMiddleware, PlanController);

planRoutes.post(
  "/",
  authMiddleware,
  roleMiddleware(["ADMIN"]),
  PlanController.create,
);

planRoutes.put(
  "/:id",
  authMiddleware,
  roleMiddleware(["ADMIN"]),
  PlanController.updatePlan,
);

planRoutes.patch(
  "/:id/activate",
  authMiddleware,
  roleMiddleware(["ADMIN"]),
  PlanController.activate,
);

planRoutes.patch(
  "/:id/deactivate",
  authMiddleware,
  roleMiddleware(["ADMIN"]),
  PlanController.deactivate,
);

export default planRoutes;
