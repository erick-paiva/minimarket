import * as yup from "yup";

const updateEstablishmentSchema = yup.object().shape({
  name: yup.string().optional(),
  cnpj: yup.string().optional(),
  contact: yup.string().optional(),
  urlLogo: yup.string().optional(),
  userId: yup.string().optional(),
  address: yup.object().shape({
    street: yup.string().optional(),
    number: yup.number().max(99999).optional(),
    zipCode: yup.string().optional(),
    district: yup.string().optional(),
  }).optional(),
});

export { updateEstablishmentSchema };
