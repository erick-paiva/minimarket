import * as yup from "yup";

const createSaleSchema = yup.object().shape({
  clientId: yup.string().uuid().required(),
  paymentId: yup.string().uuid().required(),
  establishmentId: yup.string().uuid().required(),
  products: yup
    .array()
    .of(
      yup.object().shape({
        id: yup.string().uuid().required(),
        quantity: yup.number().required(),
      })
    )
    .required(),
});

export { createSaleSchema };
