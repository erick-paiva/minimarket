import {
  Entity,
  Column,
  PrimaryColumn,
  OneToOne,
  JoinColumn,
  OneToMany,
} from "typeorm";
import { v4 as uuid } from "uuid";
import { Category } from "./category.entity";
import { Establishment } from "./establishment.entity";

@Entity()
export class Product {
  @PrimaryColumn("uuid")
  readonly id: string;

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
  urlImg: Date;

  @ManyToOne((type) => Establishment, (establishment) => establishment.products)
  establishmentId: Establishment;

  @ManyToMany((type) => Category, {
    eager: true,
  })
  @JoinTable()
  categories: Category[];

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}
