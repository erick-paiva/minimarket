import { Repository, UpdateResult } from "typeorm";
import { AppDataSource } from "../data-source";
import { Payment } from "../entities/payment.entity";

interface IPaymentRepo {
  getAll: () => Promise<Payment[]>;
  findOne: (payload: Object) => Promise<Payment>;
}

class paymentRepo implements IPaymentRepo {
  private ormRepo: Repository<Payment>;

  constructor() {
    this.ormRepo = AppDataSource.getRepository(Payment);
  }
  getAll = async () => await this.ormRepo.find();

  findOne = async (payload: object) => {
    return await this.ormRepo.findOneBy({ ...payload });
  };
}

export default new paymentRepo();
