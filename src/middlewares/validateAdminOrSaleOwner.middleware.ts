import { NextFunction, Request, Response } from "express";
import { saleRepo } from "../repositories";
import { validateUuid } from "../utils";

const validateAdminOrSaleOwner = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!!validateUuid.test(req.params.id)) {
    return res.status(400).json({
      error: `The id ${req.params.id} is not valid`,
    });
  }

  const sale = await saleRepo.findOneBy(req.params.id);

  if (
    sale.establishment.user.email !== req.decoded.email &&
    req.decoded.isAdmin === false
  ) {
    return res.status(403).json({
      error: "You are not authorized to perform this action.",
    });
  }

  req.sale = sale;

  return next();
};

export default validateAdminOrSaleOwner;
