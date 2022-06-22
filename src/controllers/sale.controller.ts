import { Request, Response } from "express";
import SaleService from "../services/sale.service";
import { handleError } from "../errors/appError";

class SaleController {
  createSale = async (req: Request, res: Response) => {
    const sale = await SaleService.createSale(req);
    return res.status(201).json(sale);
  };

  patchSale = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const { payment } = req.body;
      const { status, message } = await SaleService.patchSale(id, payment);
      return res.status(status).json({ message: message });
    } catch (err) {
      return handleError(err, res);
    }
  };

  getSales = async (req: Request, res: Response) => {
    const sales = await SaleService.getSales(req);
    return res.status(200).json(sales);
  };
}
export default new SaleController();
