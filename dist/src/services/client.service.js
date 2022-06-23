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
var schemas_1 = require("../schemas");
var establishment_repository_1 = __importDefault(require("../repositories/establishment.repository"));
var ClientService = /** @class */ (function () {
    function ClientService() {
        var _this = this;
        this.createClient = function (_a) {
            var validated = _a.validated, decoded = _a.decoded;
            return __awaiter(_this, void 0, void 0, function () {
                var establishment, contact, userEmail, isAdmin, establishmentExists, clientExists, client, createdClient;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            establishment = validated.establishment, contact = validated.contact;
                            userEmail = decoded.email;
                            isAdmin = decoded.isAdmin;
                            return [4 /*yield*/, repositories_1.establishmentRepo.findOne({
                                    id: establishment,
                                })];
                        case 1:
                            establishmentExists = _b.sent();
                            if (!establishmentExists) {
                                throw new ErrorHTTP_1.default(404, "Establishment not found");
                            }
                            if (establishmentExists.user.email !== userEmail && !isAdmin) {
                                throw new ErrorHTTP_1.default(401, "You're not the owner of this establishment");
                            }
                            clientExists = establishmentExists.clients.find(function (client) { return client.contact === contact; });
                            if (clientExists) {
                                throw new ErrorHTTP_1.default(409, "Client already exists");
                            }
                            validated.establishment = establishmentExists;
                            (validated.isLate = false),
                                (validated.isActivate = true),
                                (validated.isDeptor = false);
                            return [4 /*yield*/, repositories_1.clientRepo.save(validated)];
                        case 2:
                            client = _b.sent();
                            return [4 /*yield*/, repositories_1.clientRepo.findOne({
                                    contact: validated.contact,
                                })];
                        case 3:
                            createdClient = _b.sent();
                            return [4 /*yield*/, schemas_1.serializedCreateClientSchema.validate(createdClient, {
                                    stripUnknown: true,
                                })];
                        case 4: return [2 /*return*/, _b.sent()];
                    }
                });
            });
        };
        this.patchClient = function (_a) {
            var validated = _a.validated, params = _a.params, decoded = _a.decoded;
            return __awaiter(_this, void 0, void 0, function () {
                var id, userEmail, isAdmin, client, establishments, userEstablishments, userHaveThisClient, updatedClient;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            id = params.id;
                            userEmail = decoded.email;
                            isAdmin = decoded.isAdmin;
                            return [4 /*yield*/, repositories_1.clientRepo.findOne({ id: id })];
                        case 1:
                            client = _b.sent();
                            if (!client) {
                                throw new ErrorHTTP_1.default(404, "Client not found");
                            }
                            return [4 /*yield*/, repositories_1.establishmentRepo.getAll()];
                        case 2:
                            establishments = _b.sent();
                            userEstablishments = establishments.filter(function (establishment) { return establishment.user.email === userEmail; });
                            if (userEstablishments.length === 0 && !isAdmin) {
                                throw new ErrorHTTP_1.default(404, "Establishment not found");
                            }
                            userHaveThisClient = userEstablishments.filter(function (establishment) {
                                return establishment.clients.find(function (client) { return client.id === id; });
                            });
                            if (userHaveThisClient.length === 0 && !isAdmin) {
                                throw new ErrorHTTP_1.default(401, "You're not the owner of this client");
                            }
                            return [4 /*yield*/, repositories_1.clientRepo.update(client.id, __assign({}, validated))];
                        case 3:
                            _b.sent();
                            return [4 /*yield*/, repositories_1.clientRepo.findOne({ id: id })];
                        case 4:
                            updatedClient = _b.sent();
                            return [4 /*yield*/, schemas_1.serializedCreateClientSchema.validate(updatedClient, {
                                    stripUnknown: true,
                                })];
                        case 5: return [2 /*return*/, _b.sent()];
                    }
                });
            });
        };
        this.getEstablishmentClients = function (establishmentId, userEmail, userIsAdmin) { return __awaiter(_this, void 0, void 0, function () {
            var establishment, clients;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, establishment_repository_1.default.findOne({
                            id: establishmentId,
                        })];
                    case 1:
                        establishment = _a.sent();
                        if (!establishment) {
                            throw new ErrorHTTP_1.default(404, "Establishment not found");
                        }
                        if (establishment.user.email !== userEmail && !userIsAdmin) {
                            throw new ErrorHTTP_1.default(401, "You're not the owner of this establishment");
                        }
                        clients = establishment.clients;
                        return [2 /*return*/, clients];
                }
            });
        }); };
    }
    return ClientService;
}());
exports.default = new ClientService();
//# sourceMappingURL=client.service.js.map