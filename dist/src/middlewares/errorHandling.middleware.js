"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var ErrorHTTP_1 = __importDefault(require("../errors/ErrorHTTP"));
function default_1(error, req, res, _) {
    if (error instanceof ErrorHTTP_1.default) {
        return res.status(error.statusCode).json({
            error: error.message,
        });
    }
    return res.status(500).send({ error: "Internal server error!" });
}
exports.default = default_1;
//# sourceMappingURL=errorHandling.middleware.js.map