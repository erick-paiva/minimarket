import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity("adresses")
export class Address {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  street: string;

  @Column()
  number: number;

  @Column()
  zipCode: string;

  @Column()
  district: string;
}
