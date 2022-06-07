import { Request, Response } from "express";
import ClientService from "../services/client.service";
class ClientController {
  createClient = async (req: Request, res: Response) => {
    const { status, message } = ClientService.createClient();
    return res.status(status).json({ message: message });
  };
}

export default new ClientController();
