import * as yup from "yup";

// Yup para criação de venda
const createSaleSchema = yup.object().shape({
  clientId: yup.string().uuid().required(),
  paymentId: yup.string().uuid().required(),
  products: yup
    .array()
    .of(
      yup.object().shape({
        productId: yup.string().uuid().required(),
        quantity: yup.number().required(),
      })
    )
    .required(),
});

// YUP para serização de venda
const serializedCreateSaleSchema = yup.object().shape({
  id: yup.string().uuid().required(),
  date: yup.date().required(),
  client: yup
    .object()
    .shape({
      id: yup.string().required(),
      name: yup.string().required(),
      avatar: yup.string().required(),
      contact: yup.string().required(),
      payDay: yup.number().required(),
      isDeptor: yup.boolean().required(),
      isLate: yup.boolean().required(),
      isActivate: yup.boolean().required(),
    })
    .required(),
  paidDate: yup.date().required(),
  payment: yup
    .object()
    .shape({
      id: yup.string().uuid().required(),
      formOfPagament: yup.string().required(),
    })
    .required(),
  saleTotal: yup.number().required(),
  remainToPlay: yup.number().required(),
  products: yup
    .array()
    .of(
      yup.object().shape({
        id: yup.string().uuid().required(),
        name: yup.string().required(),
        description: yup.string().required(),
        salePrice: yup.number().required(),
        unitType: yup.string().required(),
        urlImg: yup.string().required(),
        categories: yup.array().required(),
      })
    )
    .required(),
});

export { createSaleSchema, serializedCreateSaleSchema };
