import {
  Entity,
  Column,
  OneToOne,
  JoinColumn,
  ManyToOne,
  ManyToMany,
  JoinTable,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Client } from "./client.entity";
import { Payment } from "./payment.entity";
import { Product } from "./product.entity";

@Entity("sales")
export class Sale {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  date: Date;

  @Column()
  paidDate: Date;

  @ManyToOne((type) => Client, (client) => client.sales)
  client: Client;

  @OneToOne((type) => Payment, {
    eager: true,
  })
  @JoinColumn()
  payment: Payment;

  @Column()
  saleTotal: number;

  @Column()
  remainToPlay: number;

  @ManyToMany((type) => Product, {
    eager: true,
  })
  @JoinTable()
  products: Product[];
}
