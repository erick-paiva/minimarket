import {
  Entity,
  Column,
  OneToMany,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";
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

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column({ default: true })
  isActie: boolean;

  @Column({ default: false })
  isAdmin: string;

  @OneToMany((type) => Establishment, (establishment) => establishment.user, {
    eager: true,
  })
  establishments: Establishment[];
}
