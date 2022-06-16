import { Router } from "express";
import EstablishmentController from "../controllers/establishment.controller";
import validateToken from "../middlewares/validateToken.middleware";
import { createEstablishmentSchema } from "../schemas/establishment/create.schema";
import {
  getEstablishmentByIdOr404,
  validadeSchema,
  verifyAdmin,
} from "../middlewares";
import { updateEstablishmentSchema } from "../schemas";
import checkIfAdminOrOwner from "../middlewares/checkIfAdminOrOwner.middleware";

const establishmentRouter = Router();

establishmentRouter.post(
  "/establishment",
  validateToken,
  verifyAdmin,
  validadeSchema(createEstablishmentSchema),
  EstablishmentController.createEstablishment
);

establishmentRouter.get(
  "/establishment",
  validateToken,
  EstablishmentController.getEstablishments
);

establishmentRouter.patch(
  "/establishment/:id",
  validateToken,
  verifyAdmin,
  getEstablishmentByIdOr404,
  validadeSchema(updateEstablishmentSchema),
  EstablishmentController.updateEstablishment
);

establishmentRouter.get(
  "/establishment/:id",
  validateToken,
  getEstablishmentByIdOr404,
  checkIfAdminOrOwner,
  EstablishmentController.getOneEstablishment
);

export default establishmentRouter;
