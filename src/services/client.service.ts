import { Request } from "express";
import { Client } from "../entities/client.entity";
import ErrorHTTP from "../errors/ErrorHTTP";
import { clientRepo, establishmentRepo } from "../repositories";
import { serializedCreateClientSchema } from "../schemas";
import establishmentRepository from "../repositories/establishment.repository";
import { AppError } from "../errors/appError";
import { serializedArrClient } from "../schemas";

class ClientService {
  createClient = async ({ validated, decoded }: Request) => {
    const { establishment, contact } = validated;
    const userEmail = decoded.email;
    const { isAdmin } = decoded;

    const establishmentExists = await establishmentRepo.findOne({
      id: establishment,
    });

    if (!establishmentExists) {
      throw new ErrorHTTP(404, "Establishment not found");
    }

    if (establishmentExists.user.email !== userEmail && !isAdmin) {
      throw new ErrorHTTP(401, "You're not the owner of this establishment");
    }

    const clientExists = establishmentExists.clients.find(
      (client) => client.contact === contact
    );

    if (clientExists) {
      throw new ErrorHTTP(409, "Client already exists");
    }

    validated.establishment = establishmentExists;
    (validated.isLate = false),
      (validated.isActivate = true),
      (validated.isDeptor = false);
    const client = await clientRepo.save(validated as Client);

    const createdClient = await clientRepo.findOne({
      contact: validated.contact,
    });

    return await serializedCreateClientSchema.validate(createdClient, {
      stripUnknown: true,
    });
  };

  patchClient = async ({ validated, params, decoded }: Request) => {
    const { id } = params;
    const userEmail = decoded.email;
    const { isAdmin } = decoded;

    const client = await clientRepo.findOne({ id: id });

    if (!client) {
      throw new ErrorHTTP(404, "Client not found");
    }

    const establishments = await establishmentRepo.getAll();
    const userEstablishments = establishments.filter(
      (establishment) => establishment.user.email === userEmail
    );
    if (userEstablishments.length === 0 && !isAdmin) {
      throw new ErrorHTTP(404, "Establishment not found");
    }

    const userHaveThisClient = userEstablishments.filter((establishment) =>
      establishment.clients.find((client) => client.id === id)
    );
    if (userHaveThisClient.length === 0 && !isAdmin) {
      throw new ErrorHTTP(401, "You're not the owner of this client");
    }

    await clientRepo.update(client.id, { ...(validated as Client) });

    const updatedClient = await clientRepo.findOne({ id: id });

    return await serializedCreateClientSchema.validate(updatedClient, {
      stripUnknown: true,
    });
  };

  getEstablishmentClients = async (
    establishmentId: string,
    userEmail: string,
    userIsAdmin: boolean
  ) => {
    const establishment = await establishmentRepository.findOne({
      id: establishmentId,
    });

    if (!establishment) {
      throw new ErrorHTTP(404, "Establishment not found");
    }
    if (establishment.user.email !== userEmail && !userIsAdmin) {
      throw new ErrorHTTP(401, "You're not the owner of this establishment");
    }
    const clients = establishment.clients;

    return await serializedArrClient.validate(clients, {
      stripUnknown: true,
    });
  };
}

export default new ClientService();
