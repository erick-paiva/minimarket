import { Entity, Column, PrimaryColumn } from "typeorm";
import { v4 as uuid } from "uuid";

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

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}
