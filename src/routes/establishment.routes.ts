import { Router } from "express";
import EstablishmentController from "../controllers/establishment.controller";
const establishmentRouter = Router();

establishmentRouter.post(
  "/establishment",
  EstablishmentController.createEstablishment
);

export default establishmentRouter;
