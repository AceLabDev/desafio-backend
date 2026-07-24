import { Request, Response } from "express";
import { criptomonedaService } from "./criptomoneda.service";

export const getCriptomonedas = async (req: Request, res: Response) => {
  try {
    const { moneda } = req.query;
    const criptomonedas = await criptomonedaService.findAll(moneda as string | undefined);
    return res.json(criptomonedas);
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const createCriptomoneda = async (req: Request, res: Response) => {
  try {
    const { nombre, simbolo, monedaIds } = req.body;
    const criptomoneda = await criptomonedaService.create(nombre, simbolo, monedaIds);
    return res.status(201).json(criptomoneda);
  } catch (error) {
    if (error instanceof Error && error.message === "CRIPTOMONEDA_EXISTS") {
      return res.status(400).json({ message: "Criptomoneda already exists" });
    }
    if (error instanceof Error && error.message === "MONEDAS_NOT_FOUND") {
      return res.status(400).json({ message: "Monedas not found" });
    }
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const updateCriptomoneda = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { nombre, simbolo, monedaIds } = req.body;

    const criptomoneda = await criptomonedaService.update(
      Number(id),
      nombre,
      simbolo,
      monedaIds
    );

    return res.json(criptomoneda);
  } catch (error) {
    if (error instanceof Error && error.message === "CRIPTOMONEDA_NOT_FOUND") {
      return res.status(404).json({ message: "Criptomoneda not found" });
    }
    return res.status(500).json({ message: "Internal server error" });
  }
};