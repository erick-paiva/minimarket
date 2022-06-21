import { hashSync } from "bcrypt";
import * as yup from "yup";

const responseObject = {
  id: yup.string().uuid().required(),
  name: yup.string().required(),
  email: yup.string().email().lowercase().required(),
  contact: yup.string().required(),
  avatar: yup.string().required(),
  isAdmin: yup.boolean().required(),
  isActive: yup.boolean().required(),
  createdAt: yup.date().optional(),
  updatedAt: yup.date().optional(),
};

const newShape = Object.entries(responseObject)
  .reverse()
  .reduce((prev, [key, value]) => ({ ...prev, [key]: value }), {});

const serializedOneUser = yup.object().shape(newShape);

const serializedAllUsers = yup.array().of(yup.object().shape(newShape));

const userUpdateSchema = yup.object().shape({
  name: yup.string().optional(),
  email: yup.string().email().lowercase().optional(),
  contact: yup.string().optional(),
  avatar: yup.string().optional(),
  password: yup
    .string()
    .transform((pwd: string) => hashSync(pwd, 8))
    .optional(),
});

export { serializedOneUser, serializedAllUsers, userUpdateSchema };
