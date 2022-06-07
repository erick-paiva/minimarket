import { Express } from "express";
import userRouter from "./user.routes";
import establishmentRouter from "./establishment.routes";
import clientRouter from "./client.routes";

const registerRouters = (app: Express): void => {
  app.use("/api", userRouter);
  app.use("/api", establishmentRouter);
  app.use("/api", clientRouter);
};

export default registerRouters;
