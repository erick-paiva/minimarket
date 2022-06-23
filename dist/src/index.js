"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("express-async-errors");
var express_1 = __importDefault(require("express"));
var routes_1 = __importDefault(require("./routes"));
var middlewares_1 = require("./middlewares");
var appError_1 = require("./errors/appError");
var swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
var swagger_json_1 = __importDefault(require("./swagger.json"));
var app = (0, express_1.default)();
app.use(express_1.default.json());
(0, routes_1.default)(app);
app.use(middlewares_1.errorHandling);
app.use("/api-documentation", swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swagger_json_1.default));
app.use(function (err, request, response, _) {
    if (err instanceof appError_1.AppError) {
        return response.status(err.statusCode).json({
            status: "error",
            message: err.message,
        });
    }
    return response.status(500).json({
        status: "error",
        message: "Internal server error",
    });
});
exports.default = app;
//# sourceMappingURL=index.js.map