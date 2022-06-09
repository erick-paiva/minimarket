import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { Address } from "../entities/address.entity";

interface IAdressRepo {
  save: (address: Partial<Address>) => Promise<Address>;
  getAll: () => Promise<Address[]>;
}

class addressRepo implements IAdressRepo {
  private ormRepo: Repository<Address>;

  constructor() {
    this.ormRepo = AppDataSource.getRepository(Address);
  }

  save = async (address: Partial<Address>) => {
    return await this.ormRepo.save(address);
  };

  retrieve = async (payload: object) => {
    return await this.ormRepo.findOneBy({ ...payload });
  };

  getAll = () => this.ormRepo.find();
}

export default new addressRepo();
