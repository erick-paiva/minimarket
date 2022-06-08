import {
  Entity,
  Column,
  OneToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Establishment } from "./establishment.entity";
import { Sale } from "./sale.entity";

@Entity()
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

  @OneToMany((type) => Sale, (sale) => sale.clientId, {
    eager: true,
  })
  sales: Sale[];
}
