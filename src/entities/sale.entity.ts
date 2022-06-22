import {
  Entity,
  Column,
  JoinColumn,
  ManyToOne,
  ManyToMany,
  JoinTable,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  OneToOne,
} from "typeorm";
import { Client } from "./client.entity";
import { Establishment } from "./establishment.entity";
import { Payment } from "./payment.entity";
import { Product } from "./product.entity";

@Entity("sales")
export class Sale {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @CreateDateColumn()
  date: Date;

  @Column({ nullable: true })
  paidDate: string;

  @Column()
  isPaid: Boolean;

  @ManyToOne((type) => Client, (client) => client.sales)
  client: Client;

  @ManyToOne((type) => Payment, {
    eager: true,
  })
  @JoinColumn()
  payment: Payment;

  @Column({ type: "numeric" })
  saleTotal: number;

  @Column({ type: "numeric" })
  remainToPlay: number;

  @ManyToMany((type) => Product, {
    eager: true,
  })
  @JoinTable()
  products: Product[];

  @ManyToOne(() => Establishment)
  @JoinColumn([{ name: "establishmentId", referencedColumnName: "id" }])
  establishment: Establishment;
}
