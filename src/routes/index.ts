import { Router } from "express";
import authRoutes from "../modules/auth/auth.routes";
// más adelante:
// import monedaRoutes from "../modules/moneda/moneda.routes.js";
// import criptomonedaRoutes from "../modules/criptomoneda/criptomoneda.routes.js";

const router = Router();

router.use("/auth", authRoutes);
// router.use("/moneda", monedaRoutes);
// router.use("/criptomoneda", criptomonedaRoutes);

export default router;