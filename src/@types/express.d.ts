import { type } from "os";
import { User } from "../entities";
import { Address } from "../entities/address.entity";
import { Establishment } from "../entities/establishment.entity";

type TValidated = User | Address | Establishment;

declare global {
  namespace Express {
    interface Request {
      validated: User | Establishment;
      user: User;
    }
  }
}
