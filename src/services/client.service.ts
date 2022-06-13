import { Request } from "express";
import { Client } from "../entities/client.entity";
import ErrorHTTP from "../errors/ErrorHTTP";
import { clientRepo } from "../repositories";

class ClientService {
  createClient = async ({ validated }: Request) => {
    const { name } = validated;
    try {
      const clientExists = (await clientRepo.findOne(name)) as Client | null;

      if (clientExists) {
        throw new Error();
      }
    } catch (err: any) {
      throw new ErrorHTTP(409, "Client already exists");
    }
    return { status: 200, message: "post client" };
  };

  patchClient = () => {
    return { status: 200, message: "patch client" };
  };
}

export default new ClientService();
