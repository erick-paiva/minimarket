import {
  Entity,
  Column,
  ManyToOne,
  ManyToMany,
  JoinTable,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Category } from "./category.entity";
import { Establishment } from "./establishment.entity";

@Entity("products")
export class Product {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  salePrice: string;

  @Column()
  costPrice: string;

  @Column()
  unitType: string;

  @Column()
  urlImg: string;

  @ManyToOne((type) => Establishment, (establishment) => establishment.products)
  establishment: Establishment;

  @ManyToMany((type) => Category, {
    eager: true,
  })
  @JoinTable()
  categories: Category[];
}
