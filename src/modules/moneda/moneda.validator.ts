import { body } from "express-validator";

export const createMonedaValidator = [
  body("nombre").notEmpty().withMessage("Nombre is required"),
  body("codigo").notEmpty().withMessage("Codigo is required"),
];