import { Router } from "express";
import EstablishmentController from "../controllers/establishment.controller";
import { validadeSchema } from "../middlewares";
import validateToken from "../middlewares/validateToken.middleware";
import { createEstablishmentSchema } from "../schemas/establishment/create.schema";
const establishmentRouter = Router();

establishmentRouter.post(
  "/establishment",
  validateToken,
  validadeSchema(createEstablishmentSchema),
  EstablishmentController.createEstablishment
);
establishmentRouter.get(
  "/establishment",
  validateToken,
  EstablishmentController.getEstablishments
);

export default establishmentRouter;
