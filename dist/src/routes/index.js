"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var user_routes_1 = __importDefault(require("./user.routes"));
var establishment_routes_1 = __importDefault(require("./establishment.routes"));
var client_routes_1 = __importDefault(require("./client.routes"));
var product_routes_1 = __importDefault(require("./product.routes"));
var sale_routes_1 = __importDefault(require("./sale.routes"));
var payment_routes_1 = __importDefault(require("./payment.routes"));
var registerRouters = function (app) {
    app.use("/api", user_routes_1.default);
    app.use("/api", establishment_routes_1.default);
    app.use("/api", client_routes_1.default);
    app.use("/api", product_routes_1.default);
    app.use("/api", sale_routes_1.default);
    app.use("/api", payment_routes_1.default);
};
exports.default = registerRouters;
//# sourceMappingURL=index.js.map