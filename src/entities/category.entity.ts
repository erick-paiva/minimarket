import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity("categories")
export class Category {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  name: string;

  @Column()
  image: string;
}
