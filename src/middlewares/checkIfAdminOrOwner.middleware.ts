import { NextFunction, Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { identifiesIfTheRepositoryExists } from "../utils/stablesh";

const checkIfAdminOrOwner = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = req.decoded;
    if (user?.isAdmin) {
      next();
    }

    const { path } = req.route;
    const repository: string = identifiesIfTheRepositoryExists(
      path.split("/")[1]
    );

    if (!repository) {
      return res.status(400).json({
        message: "Invalid request",
      });
    }

    const database = AppDataSource.getRepository(repository);

    const responseDb = await database.findOne({
      where: {
        [path.split(":")[1]]: req.params[path.split(":")[1]],
      },
    });

    console.log(responseDb, "responseDb");
    const isOwner = Object.values(responseDb).find(
      (ele) => ele.email === user.email
    );

    if (!isOwner) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }

    req.findRepository = responseDb as object;
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }

  return next();
};

export default checkIfAdminOrOwner;
