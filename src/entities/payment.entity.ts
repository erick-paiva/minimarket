import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity("payments")
export class Payment {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  formOfPagament: string;
}
