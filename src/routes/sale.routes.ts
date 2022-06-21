import "express-async-errors";
import { Router } from "express";
import SaleController from "../controllers/sale.controller";
import { validadeSchema, validateToken } from "../middlewares";
import { createSaleSchema } from "../schemas/sale/create.schema";
const saleRouter = Router();

<<<<<<< HEAD
saleRouter.post(
  "/sale",
  validadeSchema(createSaleSchema),
  validateToken,
  SaleController.createSale
);
// saleRouter.patch("/sale/:id", SaleController.patchSale);
=======
saleRouter.post("/sale", SaleController.createSale);
saleRouter.patch("/sale/:id", SaleController.patchSale);
saleRouter.get("/sale/:establishmentId", SaleController.getSales);
>>>>>>> 97f0c0fbbc450886af096fb82a9a460597562126

export default saleRouter;
