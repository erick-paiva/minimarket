import { Repository, UpdateResult } from "typeorm";
import { AppDataSource } from "../data-source";
import { Product } from "../entities/product.entity";

interface IProductRepository {
  save: (Product: Product) => Promise<Product>;
  findOne: (payload: object) => Promise<Product | null>;
  all: () => Promise<Product[]>;
  update: (id: string, payload: Partial<Product>) => Promise<UpdateResult>;
}

class ProductRepo implements IProductRepository {
  private ormRepo: Repository<Product>;

  constructor() {
    this.ormRepo = AppDataSource.getRepository(Product);
  }

  save = async (product: Partial<Product>) => await this.ormRepo.save(product);

  all = async () => await this.ormRepo.find();

  findOne = async (payload: object) => {
    return await this.ormRepo.findOneBy({ ...payload });
  };

  update = async (id: string, payload: Partial<Product>) =>
    await this.ormRepo.update(id, { ...payload });
}

export default new ProductRepo();
