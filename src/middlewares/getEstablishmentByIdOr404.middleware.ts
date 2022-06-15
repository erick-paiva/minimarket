import { NextFunction, Request, Response } from "express";
import ErrorHTTP from "../errors/ErrorHTTP";
import { establishmentRepo } from "../repositories";

const getEstablishmentByIdOr404 = async (
  req: Request,
  _: Response,
  next: NextFunction
) => {
  try {
    let { id } = req.params;

    const foundEstablishment = await establishmentRepo.findOne({ id: id });

    if (!foundEstablishment) {
      throw new Error();
    }

    req.establishment = foundEstablishment;

    next();
  } catch (err: any) {
    if (err instanceof Error) {
      throw new ErrorHTTP(
        404,
        `Establishment with id ${req.params.id} not found.`
      );
    }
  }
};

export default getEstablishmentByIdOr404;
