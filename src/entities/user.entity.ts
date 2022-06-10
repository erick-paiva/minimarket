import { hash } from "bcrypt";
import {
  Entity,
  Column,
  OneToMany,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  BeforeInsert,
  BeforeUpdate,
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
  isActive: boolean;

  @Column({ default: false })
  isAdmin: string;

  @OneToMany((type) => Establishment, (establishment) => establishment.user, {
    eager: true,
  })
  establishments: Establishment[];

  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword() {
    return this.password && (this.password = await hash(this.password, 10));
  }
}
