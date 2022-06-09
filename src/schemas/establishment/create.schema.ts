import * as yup from "yup";

const createEstablishmentSchema = yup.object().shape({
  name: yup.string().required(),
  cnpj: yup.string().required(),
  contact: yup.string().required(),
  urlLogo: yup.string().required(),
  userId: yup.string().required(),
  address: yup.object().shape({
    street: yup.string().required(),
    number: yup.number().max(99999).required(),
    zipCode: yup.string().required(),
    district: yup.string().required(),
  }),
});

const responseObject = {
  id: yup.string().required(),
  name: yup.string().required(),
  cnpj: yup.string().required(),
  contact: yup.string().required(),
  urlLogo: yup.string().required(),
  userId: yup.string().required(),
  address: yup.object().shape({
    street: yup.string().required(),
    number: yup.number().required(),
    zipCode: yup.string().required(),
    district: yup.string().required(),
  }),
};

const newShape = Object.entries(responseObject)
  .reverse()
  .reduce((prev, [key, value]) => ({ ...prev, [key]: value }), {});

const serializedCreateEstablishmentSchema = yup.object().shape(newShape);

export { createEstablishmentSchema, serializedCreateEstablishmentSchema };
