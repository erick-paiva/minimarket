import { Router } from "express";
import ProductController from "../controllers/product.controller";
import { validateToken } from "../middlewares";
import { createProductSchema } from "../schemas";
import { validadeSchema } from "../middlewares";
const productRouter = Router();

productRouter.post(
  "/product/:id",
  validateToken,
  validadeSchema(createProductSchema),
  ProductController.createProduct
);
productRouter.patch("/product/:id", ProductController.patchProduct);

export default productRouter;
