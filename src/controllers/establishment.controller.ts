import EstablishmentService from "../services/establishment.service";
import { Request, Response } from "express";
class EstablishmentController {
  createEstablishment = async (req: Request, res: Response) => {
    const establishment = await EstablishmentService.createEstablishment(req);
    return res.status(201).json(establishment);
  };

  getEstablishments = async (req: Request, res: Response) => {
    const establishments = await EstablishmentService.getEstablishments(req);
    return res.status(200).json(establishments);
  };

  getOneEstablishment = async (req: Request, res: Response) => {
    const establishments = await EstablishmentService.getOneEstablishment(req);
    return res.status(200).json(establishments);
  };

  updateEstablishment = async (req: Request, res: Response) => {
    const establishment = await EstablishmentService.updateEstablishment(req);
    return res.status(200).json(establishment);
  };
}
export default new EstablishmentController();
