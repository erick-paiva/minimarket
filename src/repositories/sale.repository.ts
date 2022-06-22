import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { Sale } from "../entities/sale.entity";

interface ISaleRepository {
  save: (sale: Sale) => Promise<Sale>;
  findOne: (payload: object) => Promise<Sale | null>;
  all: () => Promise<Sale[]>;
}

class saleRepo implements ISaleRepository {
  private ormRepo: Repository<Sale>;

  constructor() {
    this.ormRepo = AppDataSource.getRepository(Sale);
  }

  save = async (sale: Partial<Sale>) => await this.ormRepo.save(sale);

  all = async () => await this.ormRepo.find();

  findOne = async (payload: object) => {
    return await this.ormRepo.findOneBy({ ...payload });
  };

  update = async (id: string, payload: Partial<Sale>) =>
    await this.ormRepo.update(id, { ...payload });
}

export default new saleRepo();
