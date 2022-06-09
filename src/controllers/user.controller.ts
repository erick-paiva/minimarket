import { Request, Response } from "express";
import { handleError } from "../errors/appError";
import UserService from "../services/user.service";

class UserController {
  createUser = async (req: Request, res: Response) => {
    const user = await UserService.createUser(req);
    console.log(user);
    return res.status(201).json(user);
  };
  loginUser = async (req: Request, res: Response) => {
    try {
      const { status, message } = await UserService.loginUser(req.body);
      return res.status(status).json(message);
    } catch (err) {
      return handleError(err, res);
    }
  };
}

export default new UserController();
