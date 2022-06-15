import { Router } from "express";
import ClientController from "../controllers/clients.controller";
import { validadeSchema, validateToken, verifyAdmin } from "../middlewares";
import { createClientSchema } from "../schemas";

const clientRouter = Router();

clientRouter.post(
  "/client",
  validadeSchema(createClientSchema),
  validateToken,
  verifyAdmin,
  ClientController.createClient
);
clientRouter.patch("/client/:id", ClientController.patchClient);

export default clientRouter;
