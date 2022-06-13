import * as yup from "yup";

const createClientSchema = yup.object().shape({
  name: yup.string().required(),
  avatar: yup.string().required(),
  contact: yup.string().required(),
  payday: yup.string().required(),
  isDeptor: yup.boolean().default(false).required(),
  isLate: yup.boolean().default(false).required(),
  isActivate: yup.boolean().default(true).required(),
  establishment: yup.string().required(),
  sale: yup.string().required(),
});

const responseObject = {
  name: yup.string().required(),
  avatar: yup.string().required(),
  contact: yup.string().required(),
  payday: yup.date().required(),
  isDeptor: yup.boolean().required(),
  isLate: yup.boolean().required(),
  isActivate: yup.boolean().required(),
  establishment: yup.string().required(),
  sale: yup.string().required(),
};

const newShape = Object.entries(responseObject)
  .reverse()
  .reduce((prev, [key, value]) => ({ ...prev, [key]: value }), {});

const serializedCreateClientSchema = yup.object().shape(newShape);

export { createClientSchema, serializedCreateClientSchema };
