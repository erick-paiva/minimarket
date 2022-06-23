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
var user_entity_1 = require("../entities/user.entity");
var schemas_1 = require("../schemas");
var user_repository_1 = __importDefault(require("../repositories/user.repository"));
var appError_1 = require("../errors/appError");
var bcrypt_1 = require("bcrypt");
var jsonwebtoken_1 = require("jsonwebtoken");
var dotenv_1 = require("dotenv");
var ErrorHTTP_1 = __importDefault(require("../errors/ErrorHTTP"));
(0, dotenv_1.config)();
var UserService = /** @class */ (function () {
    function UserService() {
        var _this = this;
        this.createUser = function (_a) {
            var validated = _a.validated;
            return __awaiter(_this, void 0, void 0, function () {
                var userAlreadyExists, user, createdUser;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0: return [4 /*yield*/, user_repository_1.default.findOne({
                                email: validated.email,
                            })];
                        case 1:
                            userAlreadyExists = (_b.sent());
                            if (userAlreadyExists) {
                                throw new ErrorHTTP_1.default(409, "Email already exists");
                            }
                            return [4 /*yield*/, user_repository_1.default.save(Object.assign(new user_entity_1.User(), validated))];
                        case 2:
                            user = _b.sent();
                            return [4 /*yield*/, user_repository_1.default.findOne({ id: user.id })];
                        case 3:
                            createdUser = _b.sent();
                            return [4 /*yield*/, schemas_1.serializedCreateUserSchema.validate(createdUser, {
                                    stripUnknown: true,
                                })];
                        case 4: return [2 /*return*/, _b.sent()];
                    }
                });
            });
        };
        this.loginUser = function (userData) { return __awaiter(_this, void 0, void 0, function () {
            var _a, email, password, user, isValid, token;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = userData, email = _a.email, password = _a.password;
                        return [4 /*yield*/, user_repository_1.default.findOne({ email: email })];
                    case 1:
                        user = (_b.sent());
                        if (!user) {
                            throw new appError_1.UserError(404, "User not found");
                        }
                        return [4 /*yield*/, (0, bcrypt_1.compare)(password, user === null || user === void 0 ? void 0 : user.password)];
                    case 2:
                        isValid = _b.sent();
                        if (!isValid) {
                            throw new appError_1.UserError(401, "Email or password is incorrect");
                        }
                        token = (0, jsonwebtoken_1.sign)({ email: user.email, isAdmin: user.isAdmin }, process.env.SECRET_KEY, {
                            expiresIn: process.env.EXPIRES_IN,
                        });
                        return [2 /*return*/, {
                                status: 200,
                                message: {
                                    token: token,
                                },
                            }];
                }
            });
        }); };
        this.getUser = function (req) { return __awaiter(_this, void 0, void 0, function () {
            var token, decoded, user, users;
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(" ")[1];
                        decoded = (0, jsonwebtoken_1.decode)(token);
                        if (!!decoded.isAdmin) return [3 /*break*/, 2];
                        return [4 /*yield*/, user_repository_1.default.findOne({
                                email: decoded.email,
                            })];
                    case 1:
                        user = (_b.sent());
                        return [2 /*return*/, schemas_1.serializedOneUser.validate(user)];
                    case 2: return [4 /*yield*/, user_repository_1.default.all()];
                    case 3:
                        users = (_b.sent());
                        return [4 /*yield*/, schemas_1.serializedAllUsers.validate(users, { stripUnknown: true })];
                    case 4: return [2 /*return*/, _b.sent()];
                }
            });
        }); };
        this.getByid = function (req) { return __awaiter(_this, void 0, void 0, function () {
            var id, user;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        id = req.params.id;
                        return [4 /*yield*/, user_repository_1.default.findOne({ id: id })];
                    case 1:
                        user = _a.sent();
                        if (!user) {
                            throw new ErrorHTTP_1.default(404, "User not found");
                        }
                        return [4 /*yield*/, schemas_1.serializedOneUser.validate(user, { stripUnknown: true })];
                    case 2: return [2 /*return*/, _a.sent()];
                }
            });
        }); };
        this.isActive = function (req) { return __awaiter(_this, void 0, void 0, function () {
            var id, user, updatedUser;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        id = req.params.id;
                        return [4 /*yield*/, user_repository_1.default.findOne({ id: id })];
                    case 1:
                        user = _a.sent();
                        if (!user) {
                            throw new ErrorHTTP_1.default(404, "User not found");
                        }
                        return [4 /*yield*/, user_repository_1.default.update(user.id, __assign({}, { isActive: !user.isActive }))];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, user_repository_1.default.findOne({ id: id })];
                    case 3:
                        updatedUser = _a.sent();
                        return [4 /*yield*/, schemas_1.serializedOneUser.validate(updatedUser, {
                                stripUnknown: true,
                            })];
                    case 4: return [2 /*return*/, _a.sent()];
                }
            });
        }); };
        this.update = function (_a) {
            var validated = _a.validated, params = _a.params;
            return __awaiter(_this, void 0, void 0, function () {
                var id, user, updatedUser;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            id = params.id;
                            return [4 /*yield*/, user_repository_1.default.findOne({ id: id })];
                        case 1:
                            user = _b.sent();
                            if (!user) {
                                throw new ErrorHTTP_1.default(404, "User not found");
                            }
                            return [4 /*yield*/, user_repository_1.default.update(user.id, __assign({}, validated))];
                        case 2:
                            _b.sent();
                            return [4 /*yield*/, user_repository_1.default.findOne({ id: id })];
                        case 3:
                            updatedUser = _b.sent();
                            return [4 /*yield*/, schemas_1.serializedOneUser.validate(updatedUser, {
                                    stripUnknown: true,
                                })];
                        case 4: return [2 /*return*/, _b.sent()];
                    }
                });
            });
        };
    }
    return UserService;
}());
exports.default = new UserService();
//# sourceMappingURL=user.service.js.map