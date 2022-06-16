import * as yup from "yup";

const createEstablishmentSchema = yup.object().shape({
  name: yup.string().required(),
  cnpj: yup.string().required(),
  contact: yup.string().required(),
  urlLogo: yup.string().required(),
  userId: yup.string().required(),
  address: yup
    .object()
    .shape({
      street: yup.string().required(),
      number: yup.number().max(99999).required(),
      zipCode: yup.string().required(),
      district: yup.string().required(),
    })
    .required(),
});

export { createEstablishmentSchema };
