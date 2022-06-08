import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
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
