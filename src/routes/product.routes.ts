import { Router } from "express";
import ProductController from "../controllers/product.controller";
const productRouter = Router();

productRouter.post("/product", ProductController.createProduct);
productRouter.patch("/product/:id", ProductController.patchProduct);

export default productRouter;
