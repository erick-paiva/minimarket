"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var clients_controller_1 = __importDefault(require("../controllers/clients.controller"));
var middlewares_1 = require("../middlewares");
var schemas_1 = require("../schemas");
var clientRouter = (0, express_1.Router)();
clientRouter.post("/client", middlewares_1.validateToken, (0, middlewares_1.validadeSchema)(schemas_1.createClientSchema), clients_controller_1.default.createClient);
clientRouter.patch("/client/:id", middlewares_1.validateToken, (0, middlewares_1.validadeSchema)(schemas_1.clientUpdateSchema), clients_controller_1.default.patchClient);
clientRouter.get("/client/:id", middlewares_1.validateToken, clients_controller_1.default.getEstablishmentClients);
exports.default = clientRouter;
//# sourceMappingURL=client.routes.js.map