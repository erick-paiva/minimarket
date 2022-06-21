import { Request, Response } from "express";
import SaleService from "../services/sale.service";
import { handleError } from "../errors/appError";

class SaleController {
  createSale = async (req: Request, res: Response) => {
    try {
      const sale = SaleService.createSale(req);
      return res.status(201).json(sale);
    } catch (err) {
      return handleError(err, res);
    }
  };
<<<<<<< HEAD

  // patchSale = async (req: Request, res: Response) => {
  //   try {
  //     const { status, message } = SaleService.patchSale();
  //     return res.status(status).json({ message: message });
  //   } catch (err) {
  //     return handleError(err, res);
  //   }
  // };
=======
  getSales = async (req: Request, res: Response) => {
    const { establishmentId } = req.params;

    try {
      const { status, message } = SaleService.getSales(establishmentId);
      return res.status(status).json({ message: message });
    } catch (err) {
      return handleError(err, res);
    }
  };
>>>>>>> 97f0c0fbbc450886af096fb82a9a460597562126
}
export default new SaleController();
