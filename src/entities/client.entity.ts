import { Entity, Column, PrimaryColumn, OneToMany, ManyToOne } from "typeorm";
import { v4 as uuid } from "uuid";
import { Establishment } from "./establishment.entity";
import { Sale } from "./sale.entity";

@Entity()
export class Client {
  @PrimaryColumn("uuid")
  readonly id: string;

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

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}
