import { Request, Response } from "express";
import UserService from "../services/user.service";

class UserController {
  createUser = async (req: Request, res: Response) => {
    const { status, message } = UserService.createUser();
    return res.status(status).json({ message: message });
  };
  loginUser = async (req: Request, res: Response) => {
    const { status, message } = UserService.loginUser();
    return res.status(status).json({ message: message });
  };
}

export default new UserController();
