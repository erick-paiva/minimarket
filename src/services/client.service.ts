import { Request } from "express";
import { Client } from "../entities/client.entity";
import ErrorHTTP from "../errors/ErrorHTTP";
import { clientRepo, establishmentRepo } from "../repositories";
import { serializedCreateClientSchema } from "../schemas";

class ClientService {
  createClient = async ({ validated }: Request) => {
    const { establishment, contact } = validated;

    const establishmentExists = await establishmentRepo.findOne({
      id: establishment,
    });

    if (!establishmentExists) {
      throw new ErrorHTTP(404, "Establishment not found");
    }

    const clientExists = establishmentExists.clients.find(
      (client) => client.contact === contact
    );

    if (clientExists) {
      throw new ErrorHTTP(409, "Client already exists");
    }

    validated.establishment = establishmentExists;

    const client = await clientRepo.save(validated as Client);

    const createdClient = await clientRepo.findOne({
      contact: validated.contact,
    });

    return await serializedCreateClientSchema.validate(createdClient, {
      stripUnknown: true,
    });
  };

  patchClient = () => {
    return { status: 200, message: "patch client" };
  };
}

export default new ClientService();
