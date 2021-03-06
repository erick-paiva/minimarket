import "express-async-errors";
import { Router } from "express";
import userController from "../controllers/user.controller";
import {
  createUserSchema,
  loginUserSchema,
  userUpdateSchema,
} from "../schemas";
import { validadeSchema, validateToken, verifyAdmin } from "../middlewares";

const userRouter = Router();

userRouter.post(
  "/signup",
  validadeSchema(createUserSchema),
  validateToken,
  verifyAdmin,
  userController.createUser
);
userRouter.post(
  "/signin",
  validadeSchema(loginUserSchema),
  userController.loginUser
);
userRouter.get("/users", validateToken, userController.getUser);
userRouter.get(
  "/users/:id",
  validateToken,
  verifyAdmin,
  userController.getById
);
userRouter.patch(
  "/users/isActive/:id",
  validateToken,
  verifyAdmin,
  userController.isActive
);
userRouter.patch(
  "/users/:id",
  validadeSchema(userUpdateSchema),
  validateToken,
  verifyAdmin,
  userController.update
);

export default userRouter;
