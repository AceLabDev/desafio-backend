import { body } from "express-validator";

// validaciones al registrarse un usuario
export const registerValidator = [
  body("email")
    .isEmail()
    .withMessage("Email must be valid")
    .normalizeEmail(),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters"),
];

// valodaciones al logearse un usuario
export const loginValidator = [
  body("email").isEmail().withMessage("Email must be valid"),
  body("password").notEmpty().withMessage("Password is required"),
];