import { Router } from "express";
import ProductController from "../controllers/product.controller";
import { validateToken } from "../middlewares";
import { createProductSchema, productUpdateSchema } from "../schemas";
import { validadeSchema } from "../middlewares";
const productRouter = Router();

productRouter.post(
  "/product",
  validateToken,
  validadeSchema(createProductSchema),
  ProductController.createProduct
);
productRouter.patch(
  "/product/:id",
  validadeSchema(productUpdateSchema),
  validateToken,
  ProductController.patchProduct
);
productRouter.get(
  "/product/:establishmentId",
  validateToken,
  ProductController.getProducts
);

export default productRouter;
