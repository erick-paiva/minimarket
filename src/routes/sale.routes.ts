import "express-async-errors";
import { Router } from "express";
import SaleController from "../controllers/sale.controller";
import validateAdminOrEstOwner from "../middlewares/validateAdminOwner.middleware";
import { validadeSchema, validateToken, verifyAdmin } from "../middlewares";
import { createSaleSchema } from "../schemas/sale/create.schema";
import { updateEstablishmentSchema } from "../schemas";

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
  validadeSchema(updateEstablishmentSchema),
  SaleController.patchSale
);

saleRouter.get(
  "/sale/establishment/:id",
  validateToken,
  validateAdminOrEstOwner,
  SaleController.getSales
);

saleRouter.get("/sale/:id", validateToken, SaleController.getSaleById);

export default saleRouter;
