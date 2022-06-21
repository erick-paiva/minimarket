import { Request, Response } from "express";
import paymentService from "../services/payment.service";

class SaleController {
  getPaymentsController = async (req: Request, res: Response) => {
    const paymentMethods = await paymentService.getPaymentsMethods();
    return res.status(200).json(paymentMethods);
  };
}
export default new SaleController();
