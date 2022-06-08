import { Entity, Column, PrimaryColumn, OneToOne, JoinColumn } from "typeorm";
import { v4 as uuid } from "uuid";
import { Client } from "./client.entity";
import { Payment } from "./payment.entity";
import { Product } from "./product.entity";

@Entity()
export class Sale {
  @PrimaryColumn("uuid")
  readonly id: string;

  @Column()
  date: Date;

  @Column()
  paidDate: Date;

  @ManyToOne((type) => Client, (client) => client.sales)
  clientId: Client;

  @OneToOne((type) => Payment, {
    eager: true,
  })
  @JoinColumn()
  paymentId: Payment;

  @Column()
  saleTotal: number;

  @Column()
  remainToPlay: number;

  @ManyToMany((type) => Product, {
    eager: true,
  })
  @JoinTable()
  products: Product[];

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}
