"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("express-async-errors");
var express_1 = require("express");
var sale_controller_1 = __importDefault(require("../controllers/sale.controller"));
var validateAdminOwner_middleware_1 = __importDefault(require("../middlewares/validateAdminOwner.middleware"));
var middlewares_1 = require("../middlewares");
var create_schema_1 = require("../schemas/sale/create.schema");
var schemas_1 = require("../schemas");
var saleRouter = (0, express_1.Router)();
saleRouter.post("/sale", middlewares_1.validateToken, (0, middlewares_1.validadeSchema)(create_schema_1.createSaleSchema), sale_controller_1.default.createSale);
saleRouter.patch("/sale/:id", middlewares_1.validateToken, (0, middlewares_1.validadeSchema)(schemas_1.updateEstablishmentSchema), sale_controller_1.default.patchSale);
saleRouter.get("/sale/establishment/:id", middlewares_1.validateToken, validateAdminOwner_middleware_1.default, sale_controller_1.default.getSales);
saleRouter.get("/sale/:id", middlewares_1.validateToken, validateAdminOwner_middleware_1.default, sale_controller_1.default.getSaleById);
exports.default = saleRouter;
//# sourceMappingURL=sale.routes.js.map