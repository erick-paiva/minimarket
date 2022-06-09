import { Router } from "express";
import EstablishmentController from "../controllers/establishment.controller";
import { validadeSchema } from "../middlewares";
import { createEstablishmentSchema } from "../schemas/establishment/create.schema";
const establishmentRouter = Router();

establishmentRouter.post(
  "/establishment",
  validadeSchema(createEstablishmentSchema),
  EstablishmentController.createEstablishment
);
establishmentRouter.get(
  "/establishment",
  EstablishmentController.getEstablishments
);

export default establishmentRouter;
