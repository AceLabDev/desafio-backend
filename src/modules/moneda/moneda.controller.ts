import { Request, Response } from "express";
import { monedaService } from "./moneda.service";

export const getMonedas = async (req: Request, res: Response) => {
  try {
    const monedas = await monedaService.findAll();
    return res.json(monedas);
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const createMoneda = async (req: Request, res: Response) => {
  try {
    const { nombre, codigo } = req.body;
    const moneda = await monedaService.create(nombre, codigo);
    return res.status(201).json(moneda);
  } catch (error) {
    if (error instanceof Error && error.message === "MONEDA_EXISTS") {
      return res.status(400).json({ message: "Moneda already exists" });
    }
    return res.status(500).json({ message: "Internal server error" });
  }
};