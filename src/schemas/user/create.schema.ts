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
  created: yup.date().default(new Date()).optional(),
  lastAccess: yup.date().default(new Date()).optional(),
  isActivate: yup.boolean().default(true).optional(),
  isAdmin: yup.boolean().default(false).optional(),
});

const serializedCreateUserSchema = yup.object().shape({
  id: yup.string().uuid().required(),
  name: yup.string().required(),
  email: yup.string().email().lowercase().required(),
  contact: yup.string().required(),
  avatar: yup.string().required(),
  isAdmin: yup.boolean().required(),
  created: yup.date().optional(),
  lastAccess: yup.date().optional(),
});

export { createUserSchema, serializedCreateUserSchema };
