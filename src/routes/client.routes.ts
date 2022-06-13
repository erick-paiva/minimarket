import { Router } from "express";
import ClientController from "../controllers/clients.controller";
import { validadeSchema } from "../middlewares";
import { createClientSchema } from "../schemas";

const clientRouter = Router();

clientRouter.post(
  "/client",
  validadeSchema(createClientSchema),
  ClientController.createClient
);
clientRouter.patch("/client/:id", ClientController.patchClient);

export default clientRouter;
