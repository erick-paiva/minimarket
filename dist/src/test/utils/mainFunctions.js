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
exports.createAnCategory = exports.createAnPaymentMethod = exports.createAnProduct = exports.createAnSale = exports.createAnClient = exports.createAnStablishment = exports.login = exports.generateToken = exports.generateUserWithToken = void 0;
var faker_1 = require("@faker-js/faker");
var supertest_1 = __importDefault(require("supertest"));
var jsonwebtoken_1 = require("jsonwebtoken");
var __1 = __importDefault(require("../.."));
var auxiliaryFunctions_1 = require("./auxiliaryFunctions");
var data_source_1 = require("../../data-source");
var payment_entity_1 = require("../../entities/payment.entity");
var category_entity_1 = require("../../entities/category.entity");
var defaultValues_1 = require("./defaultValues");
var generateToken = function (isAdm) {
    return (0, jsonwebtoken_1.sign)({ email: "test@mail.com", isAdmin: isAdm }, process.env.SECRET_KEY, {
        expiresIn: process.env.EXPIRES_IN,
    });
};
exports.generateToken = generateToken;
var login = function (_a) {
    var email = _a.email, password = _a.password;
    return __awaiter(void 0, void 0, void 0, function () {
        var response;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, (0, supertest_1.default)(__1.default)
                        .post("/api/signin")
                        .send({ email: email, password: password })];
                case 1:
                    response = _b.sent();
                    return [2 /*return*/, response];
            }
        });
    });
};
exports.login = login;
var generateUserWithToken = function (admin) {
    if (admin === void 0) { admin = false; }
    return __awaiter(void 0, void 0, void 0, function () {
        var user, userData, token;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    user = {
                        name: faker_1.faker.name.firstName(),
                        email: faker_1.faker.internet.email().toLocaleLowerCase(),
                        password: faker_1.faker.internet.password(),
                        avatar: faker_1.faker.image.avatar(),
                        contact: faker_1.faker.phone.number(),
                    };
                    if (admin) {
                        user.isAdmin = true;
                    }
                    return [4 /*yield*/, (0, supertest_1.default)(__1.default)
                            .post("/api/signup")
                            .send(user)
                            .set("Authorization", "Bearer " + generateToken(admin))];
                case 1:
                    userData = _a.sent();
                    return [4 /*yield*/, login({ email: user.email, password: user.password })];
                case 2:
                    token = _a.sent();
                    return [2 /*return*/, {
                            user: userData.body,
                            token: token.body.token,
                        }];
            }
        });
    });
};
exports.generateUserWithToken = generateUserWithToken;
var createAnStablishment = function () { return __awaiter(void 0, void 0, void 0, function () {
    var user, response;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, generateUserWithToken(true)];
            case 1:
                user = _a.sent();
                return [4 /*yield*/, (0, supertest_1.default)(__1.default)
                        .post("/api/establishment")
                        .send({
                        name: faker_1.faker.company.companyName(),
                        cnpj: "11.0000.33/".concat((0, auxiliaryFunctions_1.generateRandomNumbers)(1000, 9999), "-09"),
                        address: {
                            street: "Rua dos Bobos",
                            number: (0, auxiliaryFunctions_1.generateRandomNumbers)(1, 999),
                            zipCode: "33.333-".concat((0, auxiliaryFunctions_1.generateRandomNumbers)(100, 200)),
                            district: faker_1.faker.address.city(),
                        },
                        contact: faker_1.faker.phone.number(),
                        urlLogo: faker_1.faker.image.avatar(),
                        userId: user.user.id,
                    })
                        .set("Authorization", "Bearer " + user.token)];
            case 2:
                response = _a.sent();
                return [2 /*return*/, { establishment: response.body, token: user.token }];
        }
    });
}); };
exports.createAnStablishment = createAnStablishment;
var createAnClient = function () { return __awaiter(void 0, void 0, void 0, function () {
    var user, establishment, response;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, generateUserWithToken(true)];
            case 1:
                user = _a.sent();
                return [4 /*yield*/, createAnStablishment()];
            case 2:
                establishment = (_a.sent()).establishment;
                return [4 /*yield*/, (0, supertest_1.default)(__1.default)
                        .post("/api/client")
                        .send({
                        name: faker_1.faker.name.firstName(),
                        avatar: faker_1.faker.image.avatar(),
                        contact: faker_1.faker.phone.number(),
                        payDay: (0, auxiliaryFunctions_1.generateRandomNumbers)(1, 31),
                        establishmentId: establishment.id,
                        isActicvate: true,
                        isLate: false,
                        isActivate: true,
                        isDeptor: true,
                    })
                        .set("Authorization", "Bearer " + user.token)];
            case 3:
                response = _a.sent();
                return [2 /*return*/, { client: response.body, token: user.token }];
        }
    });
}); };
exports.createAnClient = createAnClient;
var createAnProduct = function () { return __awaiter(void 0, void 0, void 0, function () {
    var user, establishment, response;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, generateUserWithToken(true)];
            case 1:
                user = _a.sent();
                return [4 /*yield*/, createAnStablishment()];
            case 2:
                establishment = (_a.sent()).establishment;
                return [4 /*yield*/, (0, supertest_1.default)(__1.default)
                        .post("/api/product")
                        .send({
                        name: faker_1.faker.name.firstName(),
                        description: faker_1.faker.name.firstName(),
                        salePrice: (0, auxiliaryFunctions_1.generateRandomNumbers)(10, 1000),
                        costPrice: (0, auxiliaryFunctions_1.generateRandomNumbers)(10, 1000),
                        payday: (0, auxiliaryFunctions_1.generateRandomNumbers)(1, 31),
                        unitType: "unidade",
                        urlImg: faker_1.faker.image.food(),
                        establishmentId: establishment.id,
                        categories: ["Congelados"],
                    })
                        .set("Authorization", "Bearer " + user.token)];
            case 3:
                response = _a.sent();
                return [2 /*return*/, { product: response.body, token: user.token }];
        }
    });
}); };
exports.createAnProduct = createAnProduct;
var createAnPaymentMethod = function (methods) {
    if (methods === void 0) { methods = defaultValues_1.paymentMethods; }
    return __awaiter(void 0, void 0, void 0, function () {
        var paymentRepo, payments, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    paymentRepo = data_source_1.AppDataSource.getRepository(payment_entity_1.Payment);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, paymentRepo
                            .createQueryBuilder()
                            .insert()
                            .values(methods)
                            .execute()];
                case 2:
                    payments = _a.sent();
                    return [3 /*break*/, 4];
                case 3:
                    error_1 = _a.sent();
                    return [2 /*return*/, { error: "Payment Already exists" }];
                case 4: return [2 /*return*/, { payments: payments }];
            }
        });
    });
};
exports.createAnPaymentMethod = createAnPaymentMethod;
var createAnCategory = function (categoryes) {
    if (categoryes === void 0) { categoryes = defaultValues_1.defaultCategories; }
    return __awaiter(void 0, void 0, void 0, function () {
        var categoryRepo, category, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    categoryRepo = data_source_1.AppDataSource.getRepository(category_entity_1.Category);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, categoryRepo
                            .createQueryBuilder()
                            .insert()
                            .values(categoryes)
                            .execute()];
                case 2:
                    category = _a.sent();
                    return [3 /*break*/, 4];
                case 3:
                    error_2 = _a.sent();
                    return [2 /*return*/, { error: "Category Already exists" }];
                case 4: return [2 /*return*/, { category: category }];
            }
        });
    });
};
exports.createAnCategory = createAnCategory;
var getPaymentMethods = function () { return __awaiter(void 0, void 0, void 0, function () {
    var user, response;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, createAnPaymentMethod()];
            case 1:
                _a.sent();
                return [4 /*yield*/, createAnCategory()];
            case 2:
                _a.sent();
                return [4 /*yield*/, generateUserWithToken(true)];
            case 3:
                user = _a.sent();
                return [4 /*yield*/, (0, supertest_1.default)(__1.default)
                        .get("/api/paymentMethods")
                        .set("Authorization", "Bearer " + user.token)];
            case 4:
                response = _a.sent();
                return [2 /*return*/, { payments: response.body, token: user.token }];
        }
    });
}); };
var createAnSale = function (inCash) {
    if (inCash === void 0) { inCash = true; }
    return __awaiter(void 0, void 0, void 0, function () {
        var _a, client, token, payments, product, saleData, response;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, createAnClient()];
                case 1:
                    _a = _b.sent(), client = _a.client, token = _a.token;
                    return [4 /*yield*/, getPaymentMethods()];
                case 2:
                    payments = (_b.sent()).payments;
                    return [4 /*yield*/, createAnProduct()];
                case 3:
                    product = (_b.sent()).product;
                    saleData = {
                        clientId: client.id,
                        paymentId: payments[inCash ? 0 : 1].id,
                        products: [
                            {
                                productId: product.id,
                                quantity: (0, auxiliaryFunctions_1.generateRandomNumbers)(1, 1000),
                            },
                        ],
                    };
                    return [4 /*yield*/, (0, supertest_1.default)(__1.default)
                            .post("/api/sale")
                            .send(saleData)
                            .set("Authorization", "Bearer " + token)];
                case 4:
                    response = _b.sent();
                    return [2 /*return*/, { sale: response.body, saleData: saleData, token: token }];
            }
        });
    });
};
exports.createAnSale = createAnSale;
//# sourceMappingURL=mainFunctions.js.map