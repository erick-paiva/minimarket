import * as yup from "yup";

const createClientSchema = yup.object().shape({
  name: yup.string().required(),
  avatar: yup.string().required(),
  contact: yup.string().required(),
  payDay: yup.number().required(),
  isDeptor: yup.boolean().default(false).required(),
  isLate: yup.boolean().default(false).required(),
  isActivate: yup.boolean().default(true).required(),
  establishmentId: yup.string().required(),
});

const responseObject = {
  id: yup.string().required(),
  name: yup.string().required(),
  avatar: yup.string().required(),
  contact: yup.string().required(),
  payDay: yup.number().required(),
  isDeptor: yup.boolean().required(),
  isLate: yup.boolean().required(),
  isActivate: yup.boolean().required(),
};

const clientUpdateSchema = yup.object().shape({
  name: yup.string().optional(),
  avatar: yup.string().optional(),
  contact: yup.string().optional(),
  payDay: yup.number().optional(),
  isDeptor: yup.boolean().optional(),
  isLate: yup.boolean().optional(),
  isActivate: yup.boolean().optional(),
});

const newShape = Object.entries(responseObject)
  .reverse()
  .reduce((prev, [key, value]) => ({ ...prev, [key]: value }), {});

const serializedCreateClientSchema = yup.object().shape(newShape);

export { createClientSchema, serializedCreateClientSchema, clientUpdateSchema };
