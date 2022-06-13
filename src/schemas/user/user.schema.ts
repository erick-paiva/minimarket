import * as yup from "yup";

const serializedOneUser = yup.object().shape({
  id: yup.string().uuid().required(),
  name: yup.string().required(),
  email: yup.string().email().lowercase().required(),
  contact: yup.string().required(),
  avatar: yup.string().required(),
  isAdmin: yup.boolean().required(),
  created: yup.date().optional(),
  lastAccess: yup.date().optional(),
});

const serializedAllUsers = yup.array().of(
  yup.object().shape({
    id: yup.string().uuid().required(),
    name: yup.string().required(),
    email: yup.string().email().lowercase().required(),
    contact: yup.string().required(),
    avatar: yup.string().required(),
    isAdmin: yup.boolean().required(),
    created: yup.date().optional(),
    lastAccess: yup.date().optional(),
  })
);

export { serializedOneUser, serializedAllUsers };
