import {
  Entity,
  Column,
  PrimaryColumn,
  OneToOne,
  JoinColumn,
  OneToMany,
} from "typeorm";
import { v4 as uuid } from "uuid";
import { Establishment } from "./establishment.entity";
import { Sale } from "./sale.entity";
//   import { Buy } from "./buy.entity";
//   import { Cart } from "./cart.entity";

@Entity()
export class Clients {
  @PrimaryColumn("uuid")
  readonly id: string;

  @Column()
  name: string;

  @Column()
  avatar: string;

  @Column()
  contact: string;

  @Column()
  payDay: int;

  @Column()
  isDeptor: boolean;

  @Column()
  isLate: boolean;

  @Column()
  isActivate: boolean;

  @ManyToOne((type) => Establishment, (establishment) => establishment.clients)
  establishmentId: Establishment;

  @OneToMany((type) => Sale, (sale) => sale.clientId, {
    eager: true,
  })
  sales: Sale[];

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}
