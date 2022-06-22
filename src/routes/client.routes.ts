import { Router } from "express";
import ClientController from "../controllers/clients.controller";
import { validadeSchema, validateToken } from "../middlewares";
import { clientUpdateSchema, createClientSchema } from "../schemas";

const clientRouter = Router();

clientRouter.post(
  "/client",
  validateToken,
  validadeSchema(createClientSchema),
  ClientController.createClient
);
clientRouter.patch(
  "/client/:id",
  validateToken,
  validadeSchema(clientUpdateSchema),
  ClientController.patchClient
);

clientRouter.get(
  "/client/:id",
  validateToken,
  ClientController.getEstablishmentClients
);

export default clientRouter;
