import { Repository, UpdateResult } from "typeorm";
import { AppDataSource } from "../data-source";
import { Address } from "../entities/address.entity";

interface IAdressRepo {
  save: (address: Partial<Address>) => Promise<Address>;
  findOne: (payload: Partial<Address>) => Promise<Address | null>;
  getAll: () => Promise<Address[]>;
  update: (id: string, payload: Partial<Address>) => Promise<UpdateResult>;
}

class addressRepo implements IAdressRepo {
  private ormRepo: Repository<Address>;

  constructor() {
    this.ormRepo = AppDataSource.getRepository(Address);
  }

  save = async (address: Partial<Address>) => {
    return await this.ormRepo.save(address);
  };

  findOne = async (payload: Partial<Address>) => {
    return await this.ormRepo.findOneBy({ ...payload });
  };

  getAll = async () => await this.ormRepo.find();

  update = async (id: string, payload: Partial<Address>) => {
    return await this.ormRepo.update(id, { ...payload });
  };
}

export default new addressRepo();
