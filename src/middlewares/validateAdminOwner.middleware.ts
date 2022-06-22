import { NextFunction, Request, Response } from "express";
import ErrorHTTP from "../errors/ErrorHTTP";
import { establishmentRepo } from "../repositories";

const validateAdminOrEstOwner = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (req.decoded?.isAdmin === false) {
      throw new ErrorHTTP(
        403,
        "You are not authorized to perform this action."
      );
    }

    const establishment = await establishmentRepo.findOne({
      id: req.params.id,
    });

    console.log(establishment, "establishment");

    if (!establishment) {
      throw new Error();
    }

    req.establishment = establishment;

    return next();
  } catch (error: any) {
    if (error instanceof ErrorHTTP) {
      return res.status(error.statusCode).json({
        error: error.message,
      });
    }

    throw new ErrorHTTP(
      404,
      `Establishment with id ${req.params.id} not found.`
    );
  }
};

export default validateAdminOrEstOwner;
