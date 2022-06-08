import { Router } from "express";
import ClientController from "../controllers/clients.controller";

const clientRouter = Router();

clientRouter.post("/client", ClientController.createClient);

export default clientRouter;
