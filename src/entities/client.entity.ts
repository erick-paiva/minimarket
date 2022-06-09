import {
  Entity,
  Column,
  OneToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Establishment } from "./establishment.entity";
import { Sale } from "./sale.entity";

@Entity("clients")
export class Client {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  name: string;

  @Column()
  avatar: string;

  @Column()
  contact: string;

  @Column()
  payDay: number;

  @Column()
  isDeptor: boolean;

  @Column()
  isLate: boolean;

  @Column()
  isActivate: boolean;

  @ManyToOne((type) => Establishment, (establishment) => establishment.clients)
  establishment: Establishment;

  @OneToMany((type) => Sale, (sale) => sale.client, {
    eager: true,
  })
  sales: Sale[];
}
