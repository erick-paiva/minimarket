import { Router } from "express";
import ClientController from "../controllers/clients.controller";

const clientRouter = Router();

clientRouter.post("/client", ClientController.createClient);
clientRouter.patch("/client/:id", ClientController.patchClient);

export default clientRouter;
