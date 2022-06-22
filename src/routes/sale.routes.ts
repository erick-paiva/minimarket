import "express-async-errors";
import { Router } from "express";
import SaleController from "../controllers/sale.controller";
import { validadeSchema, validateToken } from "../middlewares";
import {
  createSaleSchema,
  updateSaleSchema,
} from "../schemas/sale/create.schema";
const saleRouter = Router();

saleRouter.post(
  "/sale",
  validateToken,
  validadeSchema(createSaleSchema),
  SaleController.createSale
);
saleRouter.patch(
  "/sale/:id",
  validateToken,
  validadeSchema(updateSaleSchema),
  SaleController.patchSale
);

saleRouter.get("/sale/:establishmentId", SaleController.getSales);
export default saleRouter;
