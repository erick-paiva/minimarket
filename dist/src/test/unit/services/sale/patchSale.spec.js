"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var dotenv_1 = require("dotenv");
var supertest_1 = __importDefault(require("supertest"));
var __1 = __importDefault(require("../../../.."));
var data_source_1 = require("../../../../data-source");
var mainFunctions_1 = require("../../../utils/mainFunctions");
(0, dotenv_1.config)();
describe("Update sale test", function () {
    var connection;
    beforeAll(function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, data_source_1.AppDataSource.initialize()
                        .then(function (res) { return (connection = res); })
                        .catch(function (err) {
                        console.error("Error during Data Source initialization", err);
                    })];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    afterAll(function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, connection.destroy()];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    it("Should return 404 if the sale does not exist", function () { return __awaiter(void 0, void 0, void 0, function () {
        var token, invalidId, payment, response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, mainFunctions_1.createAnSale)()];
                case 1:
                    token = (_a.sent()).token;
                    invalidId = "9cc26733-4de1-4a60-88af-082a7a8fb0d1";
                    payment = { payment: 100 };
                    return [4 /*yield*/, (0, supertest_1.default)(__1.default)
                            .patch("/api/sale/".concat(invalidId))
                            .send(payment)
                            .set("Authorization", "Bearer " + token)];
                case 2:
                    response = _a.sent();
                    expect(response.body.id).not.toBeDefined();
                    expect(response.body).toStrictEqual({
                        error: "Sale not found",
                    });
                    expect(response.status).toBe(404);
                    return [2 /*return*/];
            }
        });
    }); });
    it("Should return 409 if the sale is already paid", function () { return __awaiter(void 0, void 0, void 0, function () {
        var _a, sale, token, payment, response;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, (0, mainFunctions_1.createAnSale)()];
                case 1:
                    _a = _b.sent(), sale = _a.sale, token = _a.token;
                    payment = { payment: 100 };
                    return [4 /*yield*/, (0, supertest_1.default)(__1.default)
                            .patch("/api/sale/".concat(sale.id))
                            .send(payment)
                            .set("Authorization", "Bearer " + token)];
                case 2:
                    response = _b.sent();
                    expect(response.body.id).not.toBeDefined();
                    expect(response.body).toStrictEqual({
                        message: "this sale is already paid",
                    });
                    expect(response.status).toBe(409);
                    return [2 /*return*/];
            }
        });
    }); });
    it("Should return 200 ok if the payment goes through", function () { return __awaiter(void 0, void 0, void 0, function () {
        var _a, sale, token, expectResponse, payment, response;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, (0, mainFunctions_1.createAnSale)(false)];
                case 1:
                    _a = _b.sent(), sale = _a.sale, token = _a.token;
                    expectResponse = {
                        message: {
                            isPaid: false,
                            remainToPay: sale.saleTotal - 1,
                            thing: 0,
                        },
                    };
                    payment = { payment: 1 };
                    return [4 /*yield*/, (0, supertest_1.default)(__1.default)
                            .patch("/api/sale/".concat(sale.id))
                            .send(payment)
                            .set("Authorization", "Bearer " + token)];
                case 2:
                    response = _b.sent();
                    expect(response.body.message).toBeDefined();
                    expect(response.body).toStrictEqual(expectResponse);
                    expect(response.status).toBe(200);
                    return [2 /*return*/];
            }
        });
    }); });
    it("It should return 200 ok if the payment is correct and it should return the paid with true", function () { return __awaiter(void 0, void 0, void 0, function () {
        var _a, sale, token, expectResponse, payment, response;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, (0, mainFunctions_1.createAnSale)(false)];
                case 1:
                    _a = _b.sent(), sale = _a.sale, token = _a.token;
                    expectResponse = {
                        message: {
                            isPaid: true,
                            remainToPay: 0,
                            thing: 0,
                        },
                    };
                    payment = { payment: sale.saleTotal };
                    return [4 /*yield*/, (0, supertest_1.default)(__1.default)
                            .patch("/api/sale/".concat(sale.id))
                            .send(payment)
                            .set("Authorization", "Bearer " + token)];
                case 2:
                    response = _b.sent();
                    expect(response.body.message).toBeDefined();
                    expect(response.body).toStrictEqual(expectResponse);
                    expect(response.status).toBe(200);
                    return [2 /*return*/];
            }
        });
    }); });
});
//# sourceMappingURL=patchSale.spec.js.map