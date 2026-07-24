import { body } from "express-validator";

export const createCriptomonedaValidator = [
  body("nombre").notEmpty().withMessage("Nombre is required"),
  body("simbolo").notEmpty().withMessage("Simbolo is required"),
  body("monedaIds")
    .isArray({ min: 1 })
    .withMessage("monedaIds must be a non-empty array"),
];

export const updateCriptomonedaValidator = [
  body("nombre").optional().notEmpty(),
  body("simbolo").optional().notEmpty(),
  body("monedaIds").optional().isArray(),
];