import { Router } from "express";
import payementController from "../controllers/payement.controller";

const paymentRouter = Router();

paymentRouter.get("/paymentMethods", payementController.getPaymentsController);

export default paymentRouter;
