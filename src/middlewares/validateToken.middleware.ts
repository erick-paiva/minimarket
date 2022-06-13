import { NextFunction, Request, Response } from "express";
import { JwtPayload, verify } from "jsonwebtoken";
import { TDecoded } from "../@types/express";

import ErrorHTTP from "../errors/ErrorHTTP";

const validateToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token: string | undefined = req.headers.authorization?.split(" ")[1];

  if (!token) {
    throw new ErrorHTTP(400, "Missing authorization token.");
  }

  return verify(
    token,
    process.env.SECRET_KEY as string,
    (err: any, decoded: any | JwtPayload) => {
      if (err) {
        throw new ErrorHTTP(401, err.message);
      }

      req.decoded = decoded as TDecoded;

      return next();
    }
  );
};

export default validateToken;
