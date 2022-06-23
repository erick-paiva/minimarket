"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = __importDefault(require("./index"));
var data_source_1 = require("./data-source");
data_source_1.AppDataSource.initialize()
    .then(function () {
    var _a;
    console.log("Database Connected!");
    var port = (_a = process.env.PORT) !== null && _a !== void 0 ? _a : 3000;
    index_1.default.listen(port, function () {
        console.log("App running on http://localhost:".concat(port, "/"));
    });
})
    .catch(function (err) { return console.error(err); });
//# sourceMappingURL=server.js.map