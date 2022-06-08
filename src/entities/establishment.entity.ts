import {
  Entity,
  Column,
  PrimaryColumn,
  OneToOne,
  JoinColumn,
  OneToMany,
} from "typeorm";
import { v4 as uuid } from "uuid";
import { Address } from "./address.entity";
import { Clients } from "./client.entity";
import { Product } from "./product.entity";
import { User } from "./user.entity";

@Entity()
export class Establishment {
  @PrimaryColumn("uuid")
  readonly id: string;

  @Column()
  name: string;

  @Column()
  cnpj: string;

  @Column()
  contact: string;

  @Column()
  urlLogo: string;

  @ManyToOne((type) => User, (user) => user.establishments)
  userId: User;

  @OneToMany((type) => Clients, (client) => client.establishmentId, {
    eager: true,
  })
  clients: Client[];

  @OneToMany((type) => Product, (product) => product.establishment, {
    eager: true,
  })
  products: Product[];

  @OneToOne((type) => Address, {
    eager: true,
  })
  @JoinColumn()
  addressId: Address;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}
