import { IEstablishment } from "./establishment.interfaces";
export interface IUser {
  name: string;
  email: string;
  contact: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
  isActive: boolean;
  isAdmin: boolean;
  establishments: IEstablishment[];
}
