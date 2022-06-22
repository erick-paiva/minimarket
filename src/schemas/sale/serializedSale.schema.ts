import * as yup from "yup";
import { newShape } from "../../utils";

const serializedObject = {
  id: yup.string().uuid().required(),
  date: yup.date().required(),
  isPaid: yup.boolean().required(),
  paidDate: yup.date().required(),
  client: yup.object().shape({
    name: yup.string().required(),
    id: yup.string().required(),
  }),
  payment: yup.object().shape({
    id: yup.string().uuid().required(),
    formOfPagament: yup.string().required(),
  }),
  saleTotal: yup.number().required(),
  remainToPay: yup.number().required(),
  products: yup.array().of(
    yup.object().shape({
      name: yup.string().required(),
      id: yup.string().uuid().required(),
    })
  ),
};

const serializedArrSaleSchema = yup
  .array()
  .of(yup.object().shape(newShape(serializedObject)));

const serializedObjSaleSchema = yup.object().shape(newShape(serializedObject));

export { serializedObjSaleSchema, serializedArrSaleSchema };
