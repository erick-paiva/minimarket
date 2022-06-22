import { Repository, UpdateResult } from "typeorm";
import { AppDataSource } from "../data-source";
import { Establishment } from "../entities/establishment.entity";

type TFindEstb = { estId: string; ownerEmail: string };
interface IEstablishmentRepo {
  save: (establishment: Partial<Establishment>) => Promise<Establishment>;
  findOne: (payload: object) => Promise<Establishment | null>;
  getAll: () => Promise<Establishment[]>;
  update: (
    id: string,
    payload: Partial<Establishment>
  ) => Promise<UpdateResult>;
}

class EstablishmentRepo implements IEstablishmentRepo {
  private ormRepo: Repository<Establishment>;

  constructor() {
    this.ormRepo = AppDataSource.getRepository(Establishment);
  }

  save = async (establishment: Partial<Establishment>) => {
    return await this.ormRepo.save(establishment);
  };

  findOne = async (payload: object) => {
    return await this.ormRepo.findOneBy({ ...payload });
  };

  getAll = async () => await this.ormRepo.find();

  update = async (id: string, payload: Partial<Establishment>) => {
    return await this.ormRepo.update(id, { ...payload });
  };
}

export default new EstablishmentRepo();
