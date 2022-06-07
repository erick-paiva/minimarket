import { Request, Response } from "express";
import EstablishmentService from "../services/establishment.service";
class EstablishmentController {
  createEstablishment = async (req: Request, res: Response) => {
    const { status, message } = EstablishmentService.createEstablishment();
    return res.status(status).json({ message: message });
  };
}

export default new EstablishmentController();
