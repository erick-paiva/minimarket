import {
  Entity,
  Column,
  OneToOne,
  JoinColumn,
  ManyToOne,
  ManyToMany,
  JoinTable,
  PrimaryGeneratedColumn,
  CreateDateColumn,
} from "typeorm";
import { Client } from "./client.entity";
import { Payment } from "./payment.entity";
import { Product } from "./product.entity";

@Entity("sales")
export class Sale {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @CreateDateColumn()
  date: Date;

  @Column()
  paidDate: Date;

  @Column()
  isPaid: Boolean;

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
