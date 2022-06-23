"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var establishment_controller_1 = __importDefault(require("../controllers/establishment.controller"));
var validateToken_middleware_1 = __importDefault(require("../middlewares/validateToken.middleware"));
var create_schema_1 = require("../schemas/establishment/create.schema");
var middlewares_1 = require("../middlewares");
var schemas_1 = require("../schemas");
var checkIfAdminOrOwner_middleware_1 = __importDefault(require("../middlewares/checkIfAdminOrOwner.middleware"));
var establishmentRouter = (0, express_1.Router)();
establishmentRouter.post("/establishment", validateToken_middleware_1.default, middlewares_1.verifyAdmin, (0, middlewares_1.validadeSchema)(create_schema_1.createEstablishmentSchema), establishment_controller_1.default.createEstablishment);
establishmentRouter.get("/establishment", validateToken_middleware_1.default, establishment_controller_1.default.getEstablishments);
establishmentRouter.get("/establishment/:id", validateToken_middleware_1.default, middlewares_1.getEstablishmentByIdOr404, checkIfAdminOrOwner_middleware_1.default, establishment_controller_1.default.getOneEstablishment);
establishmentRouter.patch("/establishment/:id", validateToken_middleware_1.default, middlewares_1.verifyAdmin, middlewares_1.getEstablishmentByIdOr404, (0, middlewares_1.validadeSchema)(schemas_1.updateEstablishmentSchema), establishment_controller_1.default.updateEstablishment);
exports.default = establishmentRouter;
//# sourceMappingURL=establishment.routes.js.map