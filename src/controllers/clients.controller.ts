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
    try {
      const { status, message } = ClientService.patchClient();
      return res.status(status).json({ message: message });
    } catch (err) {
      return handleError(err, res);
    }
  };
}
export default new ClientController();
