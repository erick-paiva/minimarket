import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { Client } from "../entities/client.entity";

interface IClientRepository {
  save: (client: Client) => Promise<Client>;
  findOne: (payload: object) => Promise<Client | null>;
  all: () => Promise<Client[]>;
}

class ClientRepo implements IClientRepository {
  private ormRepo: Repository<Client>;

  constructor() {
    this.ormRepo = AppDataSource.getRepository(Client);
  }

  save = async (client: Partial<Client>) => await this.ormRepo.save(client);

  findOne = async (payload: object) => {
    return await this.ormRepo.findOneBy({ ...payload });
  };

  all = async () => await this.ormRepo.find();
}

export default new ClientRepo();
