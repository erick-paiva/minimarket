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
var ErrorHTTP_1 = __importDefault(require("../errors/ErrorHTTP"));
var repositories_1 = require("../repositories");
var adress_repository_1 = __importDefault(require("../repositories/adress.repository"));
var schemas_1 = require("../schemas");
var EstablishmentService = /** @class */ (function () {
    function EstablishmentService() {
        var _this = this;
        this.createEstablishment = function (_a) {
            var validated = _a.validated;
            return __awaiter(_this, void 0, void 0, function () {
                var address, userFound, err_1, addressAlreadyExists, cnpjAlreadyExists, contactAlreadyExists, establishmentAddress, user, newEstablishment;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            address = validated.address;
                            _b.label = 1;
                        case 1:
                            _b.trys.push([1, 3, , 4]);
                            return [4 /*yield*/, repositories_1.userRepo.findOne({
                                    id: validated.userId,
                                })];
                        case 2:
                            userFound = (_b.sent());
                            if (!userFound) {
                                throw new Error();
                            }
                            return [3 /*break*/, 4];
                        case 3:
                            err_1 = _b.sent();
                            throw new ErrorHTTP_1.default(404, "User not found");
                        case 4: return [4 /*yield*/, repositories_1.addressRepo.findOne({
                                number: address.number,
                            })];
                        case 5:
                            addressAlreadyExists = _b.sent();
                            if (addressAlreadyExists) {
                                throw new ErrorHTTP_1.default(409, "Address number ".concat(address.number, " already registered"));
                            }
                            return [4 /*yield*/, repositories_1.establishmentRepo.findOne({
                                    cnpj: validated.cnpj,
                                })];
                        case 6:
                            cnpjAlreadyExists = _b.sent();
                            if (cnpjAlreadyExists) {
                                throw new ErrorHTTP_1.default(409, "Establishment with cnpj ".concat(validated.cnpj, " already registered"));
                            }
                            return [4 /*yield*/, repositories_1.establishmentRepo.findOne({
                                    contact: validated.contact,
                                })];
                        case 7:
                            contactAlreadyExists = _b.sent();
                            if (contactAlreadyExists) {
                                throw new ErrorHTTP_1.default(409, "Establishment with contact ".concat(validated.contact, " already registered"));
                            }
                            return [4 /*yield*/, repositories_1.addressRepo.save(address)];
                        case 8:
                            establishmentAddress = _b.sent();
                            return [4 /*yield*/, repositories_1.userRepo.findOne({ id: validated.userId })];
                        case 9:
                            user = _b.sent();
                            validated.address = establishmentAddress;
                            validated.user = user;
                            return [4 /*yield*/, repositories_1.establishmentRepo.save(validated)];
                        case 10:
                            newEstablishment = _b.sent();
                            return [4 /*yield*/, schemas_1.serializedObjEstablishmentSchema.validate(newEstablishment, {
                                    stripUnknown: true,
                                })];
                        case 11: return [2 /*return*/, _b.sent()];
                    }
                });
            });
        };
        this.getEstablishments = function (_a) {
            var decoded = _a.decoded;
            return __awaiter(_this, void 0, void 0, function () {
                var allEstablishments, userEstablishments;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0: return [4 /*yield*/, repositories_1.establishmentRepo.getAll()];
                        case 1:
                            allEstablishments = _b.sent();
                            if (!decoded.isAdmin) return [3 /*break*/, 3];
                            return [4 /*yield*/, schemas_1.serializedArrEstablishmentSchema.validate(allEstablishments, {
                                    stripUnknown: true,
                                })];
                        case 2: return [2 /*return*/, _b.sent()];
                        case 3:
                            userEstablishments = allEstablishments.filter(function (_a) {
                                var user = _a.user;
                                return user.email === decoded.email;
                            });
                            return [4 /*yield*/, schemas_1.serializedArrEstablishmentSchema.validate(userEstablishments, {
                                    stripUnknown: true,
                                })];
                        case 4: return [2 /*return*/, _b.sent()];
                    }
                });
            });
        };
        this.getOneEstablishment = function (_a) {
            var establishment = _a.establishment;
            return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0: return [4 /*yield*/, schemas_1.serializedObjEstablishmentSchema.validate(establishment, {
                                stripUnknown: true,
                            })];
                        case 1: return [2 /*return*/, _b.sent()];
                    }
                });
            });
        };
        this.updateEstablishment = function (_a) {
            var validated = _a.validated, establishment = _a.establishment;
            return __awaiter(_this, void 0, void 0, function () {
                var cnpjAlreadyExists, contactAlreadyExists, userFound, err_2, address, addressAlreadyExists, updatedEstablishment;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            if (!validated.cnpj) return [3 /*break*/, 2];
                            return [4 /*yield*/, repositories_1.establishmentRepo.findOne({
                                    cnpj: validated.cnpj,
                                })];
                        case 1:
                            cnpjAlreadyExists = _b.sent();
                            if (cnpjAlreadyExists) {
                                throw new ErrorHTTP_1.default(409, "Establishment with cnpj ".concat(validated.cnpj, " already registered."));
                            }
                            _b.label = 2;
                        case 2:
                            if (!validated.contact) return [3 /*break*/, 4];
                            return [4 /*yield*/, repositories_1.establishmentRepo.findOne({
                                    contact: validated.contact,
                                })];
                        case 3:
                            contactAlreadyExists = _b.sent();
                            if (contactAlreadyExists) {
                                throw new ErrorHTTP_1.default(409, "Establishment with contact ".concat(validated.contact, " already registered"));
                            }
                            _b.label = 4;
                        case 4:
                            if (!validated.userId) return [3 /*break*/, 8];
                            _b.label = 5;
                        case 5:
                            _b.trys.push([5, 7, , 8]);
                            return [4 /*yield*/, repositories_1.userRepo.findOne({
                                    id: validated.userId,
                                })];
                        case 6:
                            userFound = (_b.sent());
                            if (!userFound) {
                                throw new Error();
                            }
                            delete validated.userId;
                            validated.user = userFound;
                            return [3 /*break*/, 8];
                        case 7:
                            err_2 = _b.sent();
                            throw new ErrorHTTP_1.default(404, "User not found");
                        case 8:
                            if (!validated.address) return [3 /*break*/, 12];
                            address = validated.address;
                            if (!address.number) return [3 /*break*/, 10];
                            return [4 /*yield*/, repositories_1.addressRepo.findOne({
                                    number: address.number,
                                })];
                        case 9:
                            addressAlreadyExists = _b.sent();
                            if (addressAlreadyExists) {
                                throw new ErrorHTTP_1.default(409, "Address number ".concat(address.number, " already registered"));
                            }
                            _b.label = 10;
                        case 10: return [4 /*yield*/, adress_repository_1.default.update(establishment.address.id, __assign({}, address))];
                        case 11:
                            _b.sent();
                            validated.address = Object.assign(establishment.address, validated.address);
                            _b.label = 12;
                        case 12: return [4 /*yield*/, repositories_1.establishmentRepo.update(establishment.id, __assign({}, validated))];
                        case 13:
                            _b.sent();
                            return [4 /*yield*/, repositories_1.establishmentRepo.findOne({
                                    id: establishment.id,
                                })];
                        case 14:
                            updatedEstablishment = _b.sent();
                            return [4 /*yield*/, schemas_1.serializedObjEstablishmentSchema.validate(updatedEstablishment, {
                                    stripUnknown: true,
                                })];
                        case 15: return [2 /*return*/, _b.sent()];
                    }
                });
            });
        };
    }
    return EstablishmentService;
}());
exports.default = new EstablishmentService();
//# sourceMappingURL=establishment.service.js.map