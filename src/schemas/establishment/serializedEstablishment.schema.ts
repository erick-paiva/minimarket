import * as yup from "yup";
import { newShape } from "../../utils";

const objectShape = {
  id: yup.string().required(),
  name: yup.string().required(),
  cnpj: yup.string().required(),
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
    id: yup.string().required(),
  }),
};

const serializedArrEstablishmentSchema = yup
  .array()
  .of(yup.object().shape(newShape(objectShape)));

const serializedObjEstablishmentSchema = yup
  .object()
  .shape(newShape(objectShape));

export { serializedArrEstablishmentSchema, serializedObjEstablishmentSchema };
