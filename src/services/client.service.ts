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

  patchClient = async ({ validated, params }: Request) => {
    const { id } = params;

    const client = await clientRepo.findOne({ id: id });

    if (!client) {
      throw new ErrorHTTP(404, "Client not found");
    }

    await clientRepo.update(client.id, { ...(validated as Client) });

    const updatedClient = await clientRepo.findOne({ id: id });

    return await serializedCreateClientSchema.validate(updatedClient, {
      stripUnknown: true,
    });
  };
}

export default new ClientService();
