"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("express-async-errors");
var express_1 = require("express");
var user_controller_1 = __importDefault(require("../controllers/user.controller"));
var schemas_1 = require("../schemas");
var middlewares_1 = require("../middlewares");
var userRouter = (0, express_1.Router)();
userRouter.post("/signup", (0, middlewares_1.validadeSchema)(schemas_1.createUserSchema), middlewares_1.validateToken, middlewares_1.verifyAdmin, user_controller_1.default.createUser);
userRouter.post("/signin", (0, middlewares_1.validadeSchema)(schemas_1.loginUserSchema), user_controller_1.default.loginUser);
userRouter.get("/users", middlewares_1.validateToken, user_controller_1.default.getUser);
userRouter.get("/users/:id", middlewares_1.validateToken, middlewares_1.verifyAdmin, user_controller_1.default.getById);
userRouter.patch("/users/isActive/:id", middlewares_1.validateToken, middlewares_1.verifyAdmin, user_controller_1.default.isActive);
userRouter.patch("/users/:id", (0, middlewares_1.validadeSchema)(schemas_1.userUpdateSchema), middlewares_1.validateToken, middlewares_1.verifyAdmin, user_controller_1.default.update);
exports.default = userRouter;
//# sourceMappingURL=user.routes.js.map