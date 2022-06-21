import { Repository, UpdateResult } from "typeorm";
import { AppDataSource } from "../data-source";
import { Client } from "../entities/client.entity";

interface IClientRepository {
  save: (client: Client) => Promise<Client>;
  findOne: (payload: object) => Promise<Client | null>;
  all: () => Promise<Client[]>;
  update: (id: string, payload: Partial<Client>) => Promise<UpdateResult>;
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

  update = async (id: string, payload: Partial<Client>) =>
    await this.ormRepo.update(id, { ...payload });
}

export default new ClientRepo();
