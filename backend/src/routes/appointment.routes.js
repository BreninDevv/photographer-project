import { Router } from "express";
import appointmentController from "../controllers/appointmentController.js";
import authMiddleware from "../middlewares/authMiddleware.js";
import { roleMiddleware } from "../middlewares/roleMiddleware.js";

const appointmentRoutes = Router();

appointmentRoutes.use(authMiddleware);

appointmentRoutes.post("/", appointmentController.createController);

appointmentRoutes.get("/my", appointmentController.listUserController);

appointmentRoutes.get(
  "/all",
  roleMiddleware(["ADMIN"]),
  appointmentController.listAllController,
);

appointmentRoutes.patch(
  "/:id/status",
  roleMiddleware(["ADMIN"]),
  appointmentController.updateStatusController,
);

export default appointmentRoutes;
