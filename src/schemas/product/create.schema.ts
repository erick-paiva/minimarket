import * as yup from "yup";

const createProductSchema = yup.object().shape({
  name: yup.string().required(),
  description: yup.string().required(),
  salePrice: yup.string().required(),
  costPrice: yup.string().required(),
  unitType: yup.string().required(),
  urlImg: yup.string().required(),
  establishmentId: yup.string().required(),
  categories: yup.array().of(yup.string()).required(),
});

const productUpdateSchema = yup.object().shape({
  name: yup.string().optional(),
  description: yup.string().optional(),
  salePrice: yup.string().optional(),
  costPrice: yup.string().optional(),
  unitType: yup.string().optional(),
  urlImg: yup.string().optional(),
  categories: yup.array().of(yup.string()).optional(),
});

const responseObject = {
  id: yup.string().uuid().required(),
  name: yup.string().required(),
  description: yup.string().required(),
  salePrice: yup.string().required(),
  costPrice: yup.string().required(),
  unitType: yup.string().required(),
  urlImg: yup.string().required(),
  categories: yup
    .array()
    .of(
      yup.object().shape({
        name: yup.string().required(),
        image: yup.string().required(),
      })
    )
    .optional(),
};

const newShape = Object.entries(responseObject)
  .reverse()
  .reduce((prev, [key, value]) => ({ ...prev, [key]: value }), {});

const serializedCreateproductSchema = yup.object().shape(newShape);

export {
  createProductSchema,
  productUpdateSchema,
  serializedCreateproductSchema,
};
