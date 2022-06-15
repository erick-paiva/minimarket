import * as yup from "yup";

const createProductSchema = yup.object().shape({
  name: yup.string().required(),
  description: yup.string(),
  salePrice: yup.string().required(),
  costPrice: yup.string().required(),
  unitType: yup.string().required(),
  urlImg: yup.string(),
});

export { createProductSchema };
