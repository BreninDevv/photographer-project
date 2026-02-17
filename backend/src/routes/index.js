import { Router } from "express";
import authRoutes from "./auth.routes";
import userRoutes from "./user.routes";
import planRoutes from "./plan.routes";
import appointmentRoutes from "./appointment.routes";

const routes = Router();

routes.use("/auth", authRoutes);
routes.use("/users", userRoutes);
routes.use("/plans", planRoutes);
routes.use("/appointment", appointmentRoutes);

export default routes;
