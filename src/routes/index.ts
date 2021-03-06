import { Express } from "express";
import userRouter from "./user.routes";
import establishmentRouter from "./establishment.routes";
import clientRouter from "./client.routes";
import productRouter from "./product.routes";
import saleRouter from "./sale.routes";
import paymentRouter from "./payment.routes";

const registerRouters = (app: Express): void => {
  app.use("/api", userRouter);
  app.use("/api", establishmentRouter);
  app.use("/api", clientRouter);
  app.use("/api", productRouter);
  app.use("/api", saleRouter);
  app.use("/api", paymentRouter);
};

export default registerRouters;
