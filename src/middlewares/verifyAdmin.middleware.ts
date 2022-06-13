import { NextFunction, Request, Response } from "express";
import ErrorHTTP from "../errors/ErrorHTTP";
import { decode } from "jsonwebtoken";

const verifyAdmin = async (req: Request, res: Response, next: NextFunction) => {
  const token: string | any = req.headers.authorization?.split(" ")[1];

  const decoded: any = decode(token);

  if (!decoded.isAdmin) {
    throw new ErrorHTTP(401, "Missing admin permision.");
  }

  return next();
};

export default verifyAdmin;
