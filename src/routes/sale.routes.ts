import "express-async-errors";
import { Router } from "express";
import SaleController from "../controllers/sale.controller";
const saleRouter = Router();

saleRouter.post("/sale", SaleController.createSale);
saleRouter.patch("/sale/:id", SaleController.patchSale);

export default saleRouter;
