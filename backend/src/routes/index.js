import { Router } from "express";
import authRoutes from "./auth.routes.js";
import userRoutes from "./user.routes.js";
import planRoutes from "./plan.routes.js";
import appointmentRoutes from "./appointment.routes.js";

const routes = Router();

routes.use("/auth", authRoutes);
routes.use("/users", userRoutes);
routes.use("/plans", planRoutes);
routes.use("/appointment", appointmentRoutes);

export default routes;
