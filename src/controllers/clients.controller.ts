import { Request, Response } from "express";
import ClientService from "../services/client.service";
import { handleError } from "../errors/appError";
class ClientController {
  createClient = async (req: Request, res: Response) => {
    try {
      const client = await ClientService.createClient(req);
      return res.status(201).json(client);
    } catch (err) {
      return handleError(err, res);
    }
  };
  patchClient = async (req: Request, res: Response) => {
    return res.status(200).json(await ClientService.patchClient(req));
  };

  getEstablishmentClients = async (req: Request, res: Response) => {
    const establishmentId = req.params.id;
    const userEmail = req.decoded.email;
    const userIsAdmin = req.decoded.isAdmin;
    const clients = await ClientService.getEstablishmentClients(
      establishmentId,
      userEmail,
      userIsAdmin
    );
    return res.status(200).json(clients);
  };
}
export default new ClientController();
