import * as yup from "yup";
import { hashSync } from "bcrypt";

const createUserSchema = yup.object().shape({
  name: yup.string().required(),
  email: yup.string().email().lowercase().required(),
  contact: yup.string().required(),
  password: yup
    .string()
    .transform((pwd: string) => hashSync(pwd, 8))
    .required(),
  avatar: yup.string().required(),
  created: yup.date().optional(),
  lastAccess: yup.date().optional(),
  isActive: yup.boolean().optional(),
  isAdmin: yup.boolean().optional(),
});

const loginUserSchema = yup.object().shape({
  email: yup.string().email().lowercase().required(),
  password: yup.string().required(),
});

const serializedCreateUserSchema = yup.object().shape({
  id: yup.string().uuid().required(),
  name: yup.string().required(),
  email: yup.string().email().lowercase().required(),
  contact: yup.string().required(),
  avatar: yup.string().required(),
  isAdmin: yup.boolean().required(),
  isActive: yup.boolean().required(),
  created: yup.date().optional(),
  lastAccess: yup.date().optional(),
});

export { createUserSchema, serializedCreateUserSchema, loginUserSchema };
