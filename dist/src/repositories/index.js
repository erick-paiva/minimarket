"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentRepo = exports.clientRepo = exports.saleRepo = exports.userRepo = exports.addressRepo = exports.establishmentRepo = void 0;
var establishment_repository_1 = __importDefault(require("./establishment.repository"));
exports.establishmentRepo = establishment_repository_1.default;
var adress_repository_1 = __importDefault(require("./adress.repository"));
exports.addressRepo = adress_repository_1.default;
var user_repository_1 = __importDefault(require("./user.repository"));
exports.userRepo = user_repository_1.default;
var sale_repository_1 = __importDefault(require("./sale.repository"));
exports.saleRepo = sale_repository_1.default;
var client_repository_1 = __importDefault(require("./client.repository"));
exports.clientRepo = client_repository_1.default;
var Payment_repository_1 = __importDefault(require("./Payment.repository"));
exports.PaymentRepo = Payment_repository_1.default;
//# sourceMappingURL=index.js.map