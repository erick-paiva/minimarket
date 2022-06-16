import { Request } from "express";
import { Establishment } from "../entities/establishment.entity";
import { User } from "../entities/user.entity";
import ErrorHTTP from "../errors/ErrorHTTP";
import { addressRepo, establishmentRepo, userRepo } from "../repositories";
import {
  serializedArrEstablishmentSchema,
  serializedObjEstablishmentSchema,
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

    return await serializedObjEstablishmentSchema.validate(newEstablishment, {
      stripUnknown: true,
    });
  };

  getEstablishments = async ({ decoded }: Request) => {
    const allEstablishments = await establishmentRepo.getAll();

    if (decoded.isAdmin) {
      return await serializedArrEstablishmentSchema.validate(
        allEstablishments,
        {
          stripUnknown: true,
        }
      );
    }

    const userEstablishments = allEstablishments.filter(
      ({ user }) => user.email === decoded.email
    );

    return await serializedArrEstablishmentSchema.validate(userEstablishments, {
      stripUnknown: true,
    });
  };

  updateEstablishment = async ({ validated, establishment }: Request) => {
    if (validated.cnpj) {
      const cnpjAlreadyExists = await establishmentRepo.findOne({
        cnpj: validated.cnpj,
      });

      if (cnpjAlreadyExists) {
        throw new ErrorHTTP(
          409,
          `Establishment with cnpj ${validated.cnpj} already registered.`
        );
      }
    }

    if (validated.contact) {
      const contactAlreadyExists = await establishmentRepo.findOne({
        contact: validated.contact,
      });

      if (contactAlreadyExists) {
        throw new ErrorHTTP(
          409,
          `Establishment with contact ${validated.contact} already registered`
        );
      }
    }

    if (validated.userId) {
      try {
        const userFound = (await userRepo.findOne({
          id: validated.userId,
        })) as User | null;

        if (!userFound) {
          throw new Error();
        }

        delete validated.userId;
        validated.user = userFound;
      } catch (err: any) {
        throw new ErrorHTTP(404, "User not found");
      }
    }

    if (validated.address) {
      const { address } = validated;

      if (address.number) {
        const addressAlreadyExists = await addressRepo.findOne({
          number: address.number,
        });

        if (addressAlreadyExists) {
          throw new ErrorHTTP(
            409,
            `Address number ${address.number} already registered`
          );
        }
      }

      await addressRepo.update(establishment.address.id, {
        ...address,
      });

      delete validated.address;
    }

    await establishmentRepo.update(establishment.id, {
      ...(validated as Establishment),
    });

    const updatedEstablishment = await establishmentRepo.findOne({
      id: establishment.id,
    });

    return await serializedObjEstablishmentSchema.validate(
      updatedEstablishment,
      {
        stripUnknown: true,
      }
    );
  };

  getOneEstablishment = async ({ establishment }) => {
    return await serializedObjEstablishmentSchema.validate(establishment, {
      stripUnknown: true,
    });
  };
}

export default new EstablishmentService();
