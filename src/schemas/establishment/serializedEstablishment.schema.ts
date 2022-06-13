import * as yup from "yup";

const shape = {
  id: yup.string().required(),
  cnpj: yup.string().required(),
  name: yup.string().required(),
  contact: yup.string().required(),
  urlLogo: yup.string().required(),
  address: yup.object().shape({
    street: yup.string().required(),
    number: yup.number().required(),
    zipCode: yup.string().required(),
    district: yup.string().required(),
  }),
  user: yup.object().shape({
    email: yup.string().required(),
    name: yup.string().required(),
  }),
};

const newShape = Object.entries(shape)
  .reverse()
  .reduce((prev, [key, value]) => ({ ...prev, [key]: value }), {});

const serializedEstablishmentSchema = yup
  .array()
  .of(yup.object().shape(newShape));

export { serializedEstablishmentSchema };
