import { Request, Response } from "express";
import EstablishmentService from "../services/establishment.service";
import { handleError } from "../errors/appError";
class EstablishmentController {
  createEstablishment = async (req: Request, res: Response) => {
    const { status, message } = EstablishmentService.createEstablishment();
    return res.status(status).json({ message: message });
  };

  editEstablishment = async (req: Request, res: Response) => {
    try {
      const { status, message } = EstablishmentService.editEstablishment();
      return res.status(status).json({ message: message });
    } catch (err) {
      return handleError(err, res);
    }
  };
}

export default new EstablishmentController();
