import * as yup from "yup";

const createEstablishmentSchema = yup.object().shape({
  name: yup.string().required(),
  cnpj: yup.string().required(),
  address: yup
    .object()
    .shape({
      street: yup.string().required(),
      number: yup.number().required(),
      zip_code: yup.string().required(),
      district: yup.string().required(),
    })
    .required(),
  contact: yup.string().required(),
  url_logo: yup.string().required(),
  useId: yup.string().required(),
});

const serializedCreateEstablishmentSchema = yup.object().shape({
  // id: yup.string().required(),
  name: yup.string().required(),
  cnpj: yup.string().required(),
  address: yup.object().shape({
    street: yup.string().required(),
    number: yup.number().required(),
    zip_code: yup.string(),
    district: yup.string(),
  }),
  contact: yup.string().required(),
  url_logo: yup.string().required(),
  useId: yup.string().required(),
});

export { createEstablishmentSchema, serializedCreateEstablishmentSchema };
