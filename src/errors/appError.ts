import { Response } from "express";
type TMessage = string | Record<string, any> | object;
export class AppError extends Error {
  statusCode: number;

  constructor(statusCode: number, message: string) {
    super();
    this.statusCode = statusCode;
    this.message = message;
  }
}

export class UserError {
  public statusCode: number;
  public message: TMessage;

  constructor(statusCode: number, message: TMessage) {
    this.statusCode = statusCode;
    this.message = message;
  }
}

export const handleError = (err: any, res: Response) => {
  const { statusCode, message } = err;

  return res.status(statusCode).json({ error: message });
};
