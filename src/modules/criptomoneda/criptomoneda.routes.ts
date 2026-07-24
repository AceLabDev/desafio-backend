import { Router } from "express";
import {
  getCriptomonedas,
  createCriptomoneda,
  updateCriptomoneda,
} from "./criptomoneda.controller";
import {
  createCriptomonedaValidator,
  updateCriptomonedaValidator,
} from "./criptomoneda.validator";
import { validate } from "../../middlewares/validate";
import { authenticate } from "../../middlewares/authenticate";

const router = Router();

router.get("/", authenticate, getCriptomonedas);
router.post("/", authenticate, createCriptomonedaValidator, validate, createCriptomoneda);
router.put("/:id", authenticate, updateCriptomonedaValidator, validate, updateCriptomoneda);

export default router;