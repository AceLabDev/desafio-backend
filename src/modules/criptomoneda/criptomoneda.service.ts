import { AppDataSource } from "../../config/database";
import { Criptomoneda } from "../../entities/Criptomoneda";
import { Moneda } from "../../entities/Moneda";
import { In } from "typeorm";

const criptomonedaRepository = AppDataSource.getRepository(Criptomoneda);
const monedaRepository = AppDataSource.getRepository(Moneda);

export class CriptomonedaService {
  async findAll(monedaCodigo?: string) {
    const query = criptomonedaRepository
      .createQueryBuilder("criptomoneda")
      .leftJoinAndSelect("criptomoneda.monedas", "moneda");

    if (monedaCodigo) {
      query.where("moneda.codigo = :codigo", { codigo: monedaCodigo });
    }

    return query.getMany();
  }

  async create(nombre: string, simbolo: string, monedaIds: number[]) {
    const existing = await criptomonedaRepository.findOne({ where: { simbolo } });

    if (existing) {
      throw new Error("CRIPTOMONEDA_EXISTS");
    }

    const monedas = await monedaRepository.find({ where: { id: In(monedaIds) } });

    if (monedas.length === 0) {
      throw new Error("MONEDAS_NOT_FOUND");
    }

    const criptomoneda = criptomonedaRepository.create({
      nombre,
      simbolo,
      monedas,
    });

    return criptomonedaRepository.save(criptomoneda);
  }

  async update(id: number, nombre?: string, simbolo?: string, monedaIds?: number[]) {
    const criptomoneda = await criptomonedaRepository.findOne({
      where: { id },
      relations: { monedas: true},
    });

    if (!criptomoneda) {
      throw new Error("CRIPTOMONEDA_NOT_FOUND");
    }

    if (nombre) criptomoneda.nombre = nombre;
    if (simbolo) criptomoneda.simbolo = simbolo;

    if (monedaIds) {
      const monedas = await monedaRepository.find({ where: { id: In(monedaIds) } });
      criptomoneda.monedas = monedas;
    }

    return criptomonedaRepository.save(criptomoneda);
  }
}

export const criptomonedaService = new CriptomonedaService();