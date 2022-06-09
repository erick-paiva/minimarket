import {
  Entity,
  Column,
  OneToOne,
  JoinColumn,
  OneToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Address } from "./address.entity";
import { Client } from "./client.entity";
import { Product } from "./product.entity";
import { User } from "./user.entity";

@Entity("establishments")
export class Establishment {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  name: string;

  @Column({ unique: true })
  cnpj: string;

  @Column({ unique: true })
  contact: string;

  @Column()
  urlLogo: string;

  @ManyToOne((type) => User, (user) => user.establishments)
  user: User;

  @OneToMany((type) => Client, (client) => client.establishment, {
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
  address: Address;
}
