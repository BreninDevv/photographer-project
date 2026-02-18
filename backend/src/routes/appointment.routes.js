import { Router } from "express";
import { appointmentController } from "../controllers/appointmentController";
import { authMiddleware } from "../middlewares/authMiddleware";
import { roleMiddleware } from "../middlewares/roleMiddleware";

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
