import { Router } from "express";
import authRoutes from "./auth.routes";
import userRoutes from "./user.routes";
import planRoutes from "./plan.routes";

const routes = Router();

routes.use("/auth", authRoutes);
routes.use("/users", userRoutes);
routes.use("/plans", planRoutes);

export default routes;
