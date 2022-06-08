import "express-async-errors";
import { Router } from "express";
import userController from "../controllers/user.controller";
import { createUserSchema } from "../schemas";
import validadeSchema from "../middlewares/validateSchema.middleware";

const userRouter = Router();

userRouter.post(
  "/signup",
  validadeSchema(createUserSchema),
  userController.createUser
);
userRouter.post("/signin", userController.loginUser);

export default userRouter;
