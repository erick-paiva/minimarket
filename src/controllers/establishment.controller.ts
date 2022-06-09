import { Request, Response } from "express";
import EstablishmentService from "../services/establishment.service";
class EstablishmentController {
  createEstablishment = async (req: Request, res: Response) => {
    const establishment = await EstablishmentService.createEstablishment(
      req,
      res
    );
    return res.status(201).json(establishment);
  };

  getEstablishments = async (req: Request, res: Response) => {
    const establishment = EstablishmentService.getEstablishments(req, res);
    return res.status(200).json(establishment);
  };
}
export default new EstablishmentController();
