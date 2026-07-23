import { AppDataSource } from "../../config/database";
import { Moneda } from "../../entities/Moneda";

const monedaRepository = AppDataSource.getRepository(Moneda);

export class MonedaService {
  async findAll() {
    return monedaRepository.find();
  }

  async create(nombre: string, codigo: string) {
    const existing = await monedaRepository.findOne({ where: { codigo } });

    if (existing) {
      throw new Error("MONEDA_EXISTS");
    }

    const moneda = monedaRepository.create({ nombre, codigo });
    return monedaRepository.save(moneda);
  }
}

export const monedaService = new MonedaService();