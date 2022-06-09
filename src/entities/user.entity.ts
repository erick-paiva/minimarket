import { Entity, Column, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Establishment } from "./establishment.entity";

@Entity("users")
export class User {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  contact: string;

  @Column()
  password: string;

  @Column()
  avatar: string;

  @Column()
  created: Date;

  @Column()
  lastAccess: Date;

  @Column()
  isActivate: boolean;

  @Column()
  isAdmin: string;

  @OneToMany((type) => Establishment, (establishment) => establishment.user, {
    eager: true,
  })
  establishments: Establishment[];
}
