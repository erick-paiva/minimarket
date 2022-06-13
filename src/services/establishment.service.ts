import { Request } from "express";
import { Establishment } from "../entities/establishment.entity";
import { User } from "../entities/user.entity";
import ErrorHTTP from "../errors/ErrorHTTP";
import { addressRepo, establishmentRepo, userRepo } from "../repositories";
import {
  serializedCreateEstablishmentSchema,
  serializedEstablishmentSchema,
} from "../schemas";

class EstablishmentService {
  createEstablishment = async ({ validated }: Request) => {
    const { address } = validated;

    try {
      const userFound = (await userRepo.findOne({
        id: validated.userId,
      })) as User | null;

      if (!userFound) {
        throw new Error();
      }
    } catch (err: any) {
      throw new ErrorHTTP(404, "User not found");
    }

    const addressAlreadyExists = await addressRepo.findOne({
      number: address.number,
    });

    if (addressAlreadyExists) {
      throw new ErrorHTTP(
        409,
        `Address number ${address.number} already registered`
      );
    }

    const cnpjAlreadyExists = await establishmentRepo.findOne({
      cnpj: validated.cnpj,
    });

    if (cnpjAlreadyExists) {
      throw new ErrorHTTP(
        409,
        `Establishment with cnpj ${validated.cnpj} already registered`
      );
    }

    const contactAlreadyExists = await establishmentRepo.findOne({
      contact: validated.contact,
    });

    if (contactAlreadyExists) {
      throw new ErrorHTTP(
        409,
        `Establishment with contact ${validated.contact} already registered`
      );
    }

    const establishmentAddress = await addressRepo.save(
      address as Establishment
    );

    const user = await userRepo.findOne({ id: validated.userId });

    validated.address = establishmentAddress;
    validated.user = user;

    const newEstablishment = await establishmentRepo.save(
      validated as Establishment
    );

    return await serializedCreateEstablishmentSchema.validate(
      newEstablishment,
      {
        stripUnknown: true,
      }
    );
  };

  getEstablishments = async ({ decoded }: Request) => {
    const allEstablishments = await establishmentRepo.getAll();

    if (decoded.isAdmin) {
      return await serializedEstablishmentSchema.validate(allEstablishments, {
        stripUnknown: true,
      });
    }

    const userEstablishments = allEstablishments.filter(
      ({ user }) => user.email === decoded.email
    );

    return await serializedEstablishmentSchema.validate(userEstablishments, {
      stripUnknown: true,
    });
  };
}

export default new EstablishmentService();
