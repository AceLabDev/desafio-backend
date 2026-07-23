import { Router } from "express";
import { getMonedas, createMoneda } from "./moneda.controller";
import { createMonedaValidator } from "./moneda.validator";
import { validate } from "../../middlewares/validate";
import { authenticate } from "../../middlewares/authenticate";

const router = Router();

router.get("/", authenticate, getMonedas);
router.post("/", authenticate, createMonedaValidator, validate, createMoneda);

export default router;