import { Request, Response } from "express";
import { addressRepo, establishmentRepo } from "../repositories";

import { serializedCreateEstablishmentSchema } from "../schemas";

class EstablishmentService {
  createEstablishment = async ({ validated }: Request, res: Response) => {
    const { address } = validated;

    const establishmentAddress = await addressRepo.save(address);

    Object.assign(validated);

    return await serializedCreateEstablishmentSchema.validate(validated, {
      stripUnknown: true,
    });
  };

  getEstablishments = (req: Request, res: Response) => {
    return [];
  };
}

export default new EstablishmentService();
