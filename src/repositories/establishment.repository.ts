import { Repository, UpdateResult } from "typeorm";
import { AppDataSource } from "../data-source";
import { Establishment } from "../entities/establishment.entity";

interface IEstablishmentRepo {
  save: (establishment: Partial<Establishment>) => Promise<Establishment>;
  getAll: () => Promise<Establishment[]>;
}

class EstablishmentRepo implements IEstablishmentRepo {
  private ormRepo: Repository<Establishment>;

  constructor() {
    this.ormRepo = AppDataSource.getRepository(Establishment);
  }

  save = async (establishment: Partial<Establishment>) => {
    return await this.ormRepo.save(establishment);
  };

  getAll = () => this.ormRepo.find();
}

export default new EstablishmentRepo();
