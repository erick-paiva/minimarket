import { Entity, Column, PrimaryColumn } from "typeorm";
import { v4 as uuid } from "uuid";

@Entity()
export class Payment {
  @PrimaryColumn("uuid")
  readonly id: string;

  @Column()
  formOfPagament: string;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}
