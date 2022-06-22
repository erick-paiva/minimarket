import * as yup from "yup";
import { newShape } from "../../utils";

const productShape = {
  id: yup.string().required(),
  name: yup.string().required(),
};
const saleSchema = {
  id: yup.string().required(),
  isPaid: yup.boolean().required(),
  saleTotal: yup.string().required(),
  remainToPlay: yup.string().required(),
  payment: yup.object().shape({
    formOfPagament: yup.string().required(),
  }),
  products: yup.array().of(yup.object().shape(productShape)),
};

const objectShape = {
  id: yup.string().required(),
  name: yup.string().required(),
  payDay: yup.number().required(),
  isDeptor: yup.boolean().required(),
  isActivate: yup.boolean().required(),
  avatar: yup.string().required(),

  sales: yup.array().of(yup.object().shape(saleSchema)),
};

const serializedArrClient = yup
  .array()
  .of(yup.object().shape(newShape(objectShape)));

export { serializedArrClient };
