import "express-async-errors";
import express, { NextFunction, Request, Response } from "express";
import { AppError, handleError } from "./errors/appError";
import registerRouters from "./routes";

const app = express();

app.use(express.json());
registerRouters(app);

app.use((err: Error, request: Request, response: Response, _: NextFunction) => {
  if (err instanceof AppError) {
    return response.status(err.statusCode).json({
      status: "error",
      message: err.message,
    });
  }
  console.error(err);
  return response.status(500).json({
    status: "error",
    message: "Internal server error",
  });
});

export default app;
