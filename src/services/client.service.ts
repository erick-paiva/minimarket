import { Request } from "express";
import { Client } from "../entities/client.entity";
import ErrorHTTP from "../errors/ErrorHTTP";
import { clientRepo, establishmentRepo } from "../repositories";
import { serializedCreateClientSchema } from "../schemas";

class ClientService {
  createClient = async ({ validated }: Request) => {
    const { name } = validated;
    try {
      const clientExists = (await clientRepo.findOne(name)) as Client | null;

      if (clientExists) {
        throw new ErrorHTTP(409, "Client already exists");
      }

      const establishmentExists = await establishmentRepo.findOne({
        id: validated.establishment,
      });

      if (!establishmentExists) {
        throw new ErrorHTTP(404, "Establishment not found");
      }

      const client = await clientRepo.save(
        Object.assign(new Client(), validated)
      );

      const createdClient = await clientRepo.findOne({ id: client.id });

      return await serializedCreateClientSchema.validate(createdClient, {
        stripUnknown: true,
      });
    } catch (err: any) {
      throw new ErrorHTTP(409, "Client already exists");
    }
  };

  patchClient = () => {
    return { status: 200, message: "patch client" };
  };
}

export default new ClientService();
