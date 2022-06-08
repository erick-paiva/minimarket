import {
  Entity,
  Column,
  PrimaryColumn,
  OneToOne,
  JoinColumn,
  OneToMany,
} from "typeorm";
import { v4 as uuid } from "uuid";
//   import { Buy } from "./buy.entity";
//   import { Cart } from "./cart.entity";

@Entity()
export class Address {
  @PrimaryColumn("uuid")
  readonly id: string;

  @Column()
  street: string;

  @Column()
  number: number;

  @Column()
  zipCode: string;

  @Column()
  district: string;

  // @OneToMany((type) => Buy, (buy) => buy.user, {
  //   eager: true,
  // })
  // buys: Buy[];

  // @OneToOne((type) => Cart, {
  //   eager: true,
  // })

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}
