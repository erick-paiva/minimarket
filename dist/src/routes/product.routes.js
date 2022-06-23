"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var product_controller_1 = __importDefault(require("../controllers/product.controller"));
var middlewares_1 = require("../middlewares");
var schemas_1 = require("../schemas");
var middlewares_2 = require("../middlewares");
var productRouter = (0, express_1.Router)();
productRouter.post("/product", middlewares_1.validateToken, (0, middlewares_2.validadeSchema)(schemas_1.createProductSchema), product_controller_1.default.createProduct);
productRouter.patch("/product/:id", (0, middlewares_2.validadeSchema)(schemas_1.productUpdateSchema), middlewares_1.validateToken, product_controller_1.default.patchProduct);
productRouter.get("/product/:establishmentId", middlewares_1.validateToken, product_controller_1.default.getProducts);
exports.default = productRouter;
//# sourceMappingURL=product.routes.js.map