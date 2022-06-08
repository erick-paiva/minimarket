import {
  Entity,
  Column,
  PrimaryColumn,
  OneToOne,
  JoinColumn,
  OneToMany,
} from "typeorm";
import { v4 as uuid } from "uuid";
import { Establishment } from "./establishment.entity";

@Entity()
export class User {
  @PrimaryColumn("uuid")
  readonly id: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  contact: string;

  @Column()
  password_hash: string;

  @Column()
  avatar: string;

  @Column()
  created: Date;

  @Column()
  lastAccess: Time;

  @Column()
  isActivate: boolean;

  @Column()
  isAdmin: string;

  @OneToMany((type) => Establishment, (establishment) => establishment.userId, {
    eager: true,
  })
  establishments: Establishment[];

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}
