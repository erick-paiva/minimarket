import { NextFunction, Request, Response } from "express";
import * as yup from "yup";

const validateUuidParams = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const uuid = yup.string().uuid().required();

    await uuid.validate(req.params.id, {
      abortEarly: false,
      stripUnknown: true,
      strict: true,
    });

    return next();
  } catch (error: any) {
    return res.status(400).json({ message: error.errors });
  }
};

export default validateUuidParams;
