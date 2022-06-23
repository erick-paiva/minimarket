"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
var sale_entity_1 = require("../entities/sale.entity");
var ErrorHTTP_1 = __importDefault(require("../errors/ErrorHTTP"));
var repositories_1 = require("../repositories");
var product_repository_1 = __importDefault(require("../repositories/product.repository"));
var serializedSale_schema_1 = require("../schemas/sale/serializedSale.schema");
var SaleService = /** @class */ (function () {
    function SaleService() {
        var _this = this;
        this.createSale = function (_a) {
            var validated = _a.validated;
            return __awaiter(_this, void 0, void 0, function () {
                var userFound, clientFound, EstablishmentFound, payment, products, productsA, saleTotal, _i, products_1, p, productFound, sale, newSale;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0: return [4 /*yield*/, repositories_1.userRepo.findOne({
                                id: validated.userId,
                            })];
                        case 1:
                            userFound = (_b.sent());
                            if (!userFound) {
                                throw new ErrorHTTP_1.default(404, "User not found");
                            }
                            return [4 /*yield*/, repositories_1.clientRepo.findOne({
                                    id: validated.clientId,
                                })];
                        case 2:
                            clientFound = (_b.sent());
                            if (!clientFound) {
                                throw new ErrorHTTP_1.default(404, "Client not found");
                            }
                            return [4 /*yield*/, repositories_1.establishmentRepo.findOne({
                                    id: validated.establishmentId,
                                })];
                        case 3:
                            EstablishmentFound = _b.sent();
                            if (!EstablishmentFound) {
                                throw new ErrorHTTP_1.default(404, "Establishment not found");
                            }
                            return [4 /*yield*/, repositories_1.PaymentRepo.findOne({
                                    id: validated.paymentId,
                                })];
                        case 4:
                            payment = (_b.sent());
                            products = validated.products;
                            productsA = [];
                            saleTotal = 0;
                            _i = 0, products_1 = products;
                            _b.label = 5;
                        case 5:
                            if (!(_i < products_1.length)) return [3 /*break*/, 8];
                            p = products_1[_i];
                            return [4 /*yield*/, product_repository_1.default.findOne({
                                    id: p.id,
                                })];
                        case 6:
                            productFound = (_b.sent());
                            if (!productFound) {
                                throw new ErrorHTTP_1.default(404, "Product ".concat(p.id, " not found"));
                            }
                            productsA.push(productFound);
                            saleTotal += productFound.salePrice * p.quantity;
                            _b.label = 7;
                        case 7:
                            _i++;
                            return [3 /*break*/, 5];
                        case 8:
                            sale = new sale_entity_1.Sale();
                            sale.saleTotal = Number.parseFloat(saleTotal.toFixed(2));
                            sale.client = clientFound;
                            sale.isPaid = payment.formOfPagament === "À vista" ? true : false;
                            sale.paidDate = new Date().toString();
                            sale.payment = payment;
                            sale.establishment = EstablishmentFound;
                            sale.products = productsA;
                            sale.remainToPay = 0;
                            return [4 /*yield*/, repositories_1.saleRepo.save(sale)];
                        case 9:
                            newSale = _b.sent();
                            return [4 /*yield*/, serializedSale_schema_1.serializedObjSaleSchema.validate(newSale, {
                                    stripUnknown: true,
                                })];
                        case 10: return [2 /*return*/, _b.sent()];
                    }
                });
            });
        };
        this.patchSale = function (saleId, payment) { return __awaiter(_this, void 0, void 0, function () {
            var sale, newSale, newPayment, thing;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, repositories_1.saleRepo.findOne({
                            id: saleId,
                        })];
                    case 1:
                        sale = _a.sent();
                        if (!sale) {
                            throw new ErrorHTTP_1.default(404, "Sale not found");
                        }
                        if (sale.isPaid) {
                            return [2 /*return*/, { status: 409, message: "this sale is already paid" }];
                        }
                        newSale = {};
                        newPayment = sale.remainToPay > 0
                            ? sale.remainToPay - payment
                            : sale.saleTotal - payment;
                        thing = 0;
                        if (newPayment < 0) {
                            thing = newPayment * -1;
                            newSale.isPaid = true;
                            newSale.remainToPay = 0;
                        }
                        else if (newPayment === 0) {
                            newSale.isPaid = true;
                            newSale.remainToPay = 0;
                        }
                        else {
                            newSale.isPaid = false;
                            newSale.remainToPay = newPayment;
                        }
                        newSale.paidDate = new Date().toString();
                        return [4 /*yield*/, repositories_1.saleRepo.update(sale.id, __assign({}, newSale))];
                    case 2:
                        _a.sent();
                        return [2 /*return*/, {
                                status: 200,
                                message: {
                                    isPaid: newSale.isPaid,
                                    remainToPay: newSale.remainToPay,
                                    thing: thing,
                                },
                            }];
                }
            });
        }); };
        this.getSales = function (_a) {
            var params = _a.params;
            return __awaiter(_this, void 0, void 0, function () {
                var salesData, sales;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0: return [4 /*yield*/, repositories_1.saleRepo.all()];
                        case 1:
                            salesData = _b.sent();
                            sales = salesData.filter(function (sale) { return sale.establishment.id === params.id; });
                            return [4 /*yield*/, serializedSale_schema_1.serializedArrSaleSchema.validate(sales, {
                                    stripUnknown: true,
                                })];
                        case 2: return [2 /*return*/, _b.sent()];
                    }
                });
            });
        };
        this.getSaleById = function (_a) {
            var params = _a.params;
            return __awaiter(_this, void 0, void 0, function () {
                var sale, err_1;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            _b.trys.push([0, 3, , 4]);
                            return [4 /*yield*/, repositories_1.saleRepo.findOneBy(params.id)];
                        case 1:
                            sale = _b.sent();
                            if (!sale) {
                                throw new ErrorHTTP_1.default(404, "Sale with id ".concat(params.id, " not found."));
                            }
                            return [4 /*yield*/, serializedSale_schema_1.serializedObjSaleSchema.validate(sale[0], {
                                    stripUnknown: true,
                                })];
                        case 2: return [2 /*return*/, _b.sent()];
                        case 3:
                            err_1 = _b.sent();
                            if (err_1 instanceof ErrorHTTP_1.default) {
                                throw new ErrorHTTP_1.default(404, "Sale with id ".concat(params.id, " not found."));
                            }
                            throw new ErrorHTTP_1.default(404, "The id ".concat(params.id, " is not valid"));
                        case 4: return [2 /*return*/];
                    }
                });
            });
        };
    }
    return SaleService;
}());
exports.default = new SaleService();
//# sourceMappingURL=sale.service.js.map