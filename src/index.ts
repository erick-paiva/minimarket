import "express-async-errors";
import express, { NextFunction, Request, Response } from "express";
import registerRouters from "./routes";
import { errorHandling } from "./middlewares";
import { AppError } from "./errors/appError";
import swaggerUiExpress from "swagger-ui-express";
import swaggerDocument from "./swagger.json";
import swaggerDocumentEst from "./documentation/establishment/swagger.json";

const app = express();

app.use(express.json());

registerRouters(app);

app.use(errorHandling);

app.use(
  "/api-documentation",
  swaggerUiExpress.serve,
  swaggerUiExpress.setup(swaggerDocument)
);

app.use(
  "/api-documentation-est",
  swaggerUiExpress.serve,
  swaggerUiExpress.setup(swaggerDocumentEst)
);

app.use((err: Error, request: Request, response: Response, _: NextFunction) => {
  if (err instanceof AppError) {
    return response.status(err.statusCode).json({
      status: "error",
      message: err.message,
    });
  }
  return response.status(500).json({
    status: "error",
    message: "Internal server error",
  });
});

export default app;
