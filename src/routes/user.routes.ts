import "express-async-errors";
import { Router } from "express";
import userController from "../controllers/user.controller";
const userRouter = Router();

userRouter.post("/signup", userController.createUser);
userRouter.post("/signin", userController.loginUser);

export default userRouter;
