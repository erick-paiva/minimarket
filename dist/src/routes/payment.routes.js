"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var payement_controller_1 = __importDefault(require("../controllers/payement.controller"));
var paymentRouter = (0, express_1.Router)();
paymentRouter.get("/paymentMethods", payement_controller_1.default.getPaymentsController);
exports.default = paymentRouter;
//# sourceMappingURL=payment.routes.js.map