import { Request, Response } from "express";
import UserService from "../services/user.service";
import { AppError, handleError } from "../errors/appError";
class UserController {
  createUser = async (req: Request, res: Response) => {
    try {
      const { status, message } = UserService.createUser();
      return res.status(status).json({ message: message });
    } catch (err) {
      return handleError(err, res);
    }
  };
  loginUser = async (req: Request, res: Response) => {
    try {
      const { status, message } = UserService.loginUser();
      return res.status(status).json({ message: message });
    } catch (err) {
      return handleError(err, res);
    }
  };
}

export default new UserController();
