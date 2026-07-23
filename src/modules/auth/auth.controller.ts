import { Request, Response } from "express";
import { authService } from "./auth.service";

export const register = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    await authService.register(email, password);

    return res.status(201).json({ message: "User created" });
  } catch (error) {
    if (error instanceof Error && error.message === "USER_EXISTS") {
      return res.status(400).json({ message: "User already exists" });
    }

    return res.status(500).json({ message: "Internal server error" });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const token = await authService.login(email, password);

    return res.json({ token });
  } catch (error) {
    if (error instanceof Error && error.message === "INVALID_CREDENTIALS") {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    return res.status(500).json({ message: "Internal server error" });
  }
};
