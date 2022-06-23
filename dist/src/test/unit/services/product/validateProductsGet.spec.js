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
var faker_1 = require("@faker-js/faker");
var __1 = __importDefault(require("../../../.."));
var data_source_1 = require("../../../../data-source");
var jsonwebtoken_1 = require("jsonwebtoken");
(0, dotenv_1.config)();
describe("Get products test", function () {
    var connection;
    var token = function (isAdm) {
        return (0, jsonwebtoken_1.sign)({ email: "test@mail.com", isAdmin: isAdm }, process.env.SECRET_KEY, {
            expiresIn: process.env.EXPIRES_IN,
        });
    };
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
    var productData = {
        name: faker_1.faker.lorem.word(),
        description: faker_1.faker.lorem.paragraph(),
        salePrice: faker_1.faker.mersenne.rand(6, 15).toString(),
        costPrice: faker_1.faker.mersenne.rand(1, 5).toString(),
        unitType: faker_1.faker.lorem.word(),
        urlImg: faker_1.faker.image.imageUrl(),
        establishmentId: "",
    };
    var establishmentData = {
        name: faker_1.faker.company.companyName(),
        cnpj: faker_1.faker.mersenne.rand().toString(),
        address: {
            street: faker_1.faker.address.street(),
            number: faker_1.faker.mersenne.rand(),
            zipCode: faker_1.faker.address.zipCode(),
            district: faker_1.faker.address.cityName(),
        },
        contact: faker_1.faker.phone.imei(),
        urlLogo: faker_1.faker.image.imageUrl(),
        userId: "",
    };
    var userData = {
        name: faker_1.faker.name.firstName(),
        email: faker_1.faker.internet.email().toLocaleLowerCase(),
        contact: faker_1.faker.phone.imei(),
        password: faker_1.faker.mersenne.rand().toString(),
        avatar: faker_1.faker.image.avatar(),
    };
    var establishmentId = "";
    test("Should be able to get all establishment products", function () { return __awaiter(void 0, void 0, void 0, function () {
        var createUserResponse, establishmentResponse, getProductsResponse;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, supertest_1.default)(__1.default)
                        .post("/api/signup")
                        .send(userData)
                        .set("Authorization", "Bearer " + token(true))];
                case 1:
                    createUserResponse = _a.sent();
                    establishmentData.userId = createUserResponse.body.id;
                    return [4 /*yield*/, (0, supertest_1.default)(__1.default)
                            .post("/api/establishment")
                            .send(establishmentData)
                            .set("Authorization", "Bearer ".concat(token(true)))];
                case 2:
                    establishmentResponse = _a.sent();
                    establishmentId = establishmentResponse.body.id;
                    productData.establishmentId = establishmentId;
                    return [4 /*yield*/, (0, supertest_1.default)(__1.default)
                            .post("/api/product")
                            .send(productData)
                            .set("Authorization", "Bearer " + token(true))];
                case 3:
                    _a.sent();
                    return [4 /*yield*/, (0, supertest_1.default)(__1.default)
                            .get("/api/product/".concat(establishmentId))
                            .send(productData)
                            .set("Authorization", "Bearer " + token(true))];
                case 4:
                    getProductsResponse = _a.sent();
                    expect(getProductsResponse.status).toBe(200);
                    expect(getProductsResponse.body).toHaveProperty("map");
                    return [2 /*return*/];
            }
        });
    }); });
    test("Should be return status code 400 if request do not have token", function () { return __awaiter(void 0, void 0, void 0, function () {
        var productResponse;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, supertest_1.default)(__1.default).get("/api/product/".concat(establishmentId))];
                case 1:
                    productResponse = _a.sent();
                    expect(productResponse.status).toBe(400);
                    expect(productResponse.body).toHaveProperty("error");
                    return [2 /*return*/];
            }
        });
    }); });
    test("Should be return status 404 if body request establishmentId do not exists", function () { return __awaiter(void 0, void 0, void 0, function () {
        var productResponse;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    establishmentId = "************************************";
                    return [4 /*yield*/, (0, supertest_1.default)(__1.default)
                            .get("/api/product/".concat(establishmentId))
                            .send(productData)
                            .set("Authorization", "Bearer " + token(true))];
                case 1:
                    productResponse = _a.sent();
                    expect(productResponse.status).toBe(404);
                    expect(productResponse.body).toHaveProperty("error");
                    return [2 /*return*/];
            }
        });
    }); });
    test("Should be error 401 if user isn't the establishment owner", function () { return __awaiter(void 0, void 0, void 0, function () {
        var newUserData, createUserResponse, signinResponse, unauthorizedUserData, signinResponseUnauthorizedUser, newEstablishmentData, tokenUser, tokenUnathorizedUser, establishmentResponse, getProductsResponse;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    newUserData = {
                        name: faker_1.faker.name.firstName(),
                        email: faker_1.faker.internet.email().toLocaleLowerCase(),
                        contact: faker_1.faker.phone.imei(),
                        password: faker_1.faker.mersenne.rand().toString(),
                        avatar: faker_1.faker.image.avatar(),
                        isAdmin: true,
                    };
                    return [4 /*yield*/, (0, supertest_1.default)(__1.default)
                            .post("/api/signup")
                            .send(newUserData)
                            .set("Authorization", "Bearer " + token(true))];
                case 1:
                    createUserResponse = _a.sent();
                    return [4 /*yield*/, (0, supertest_1.default)(__1.default)
                            .post("/api/signin")
                            .send({ email: newUserData.email, password: newUserData.password })];
                case 2:
                    signinResponse = _a.sent();
                    unauthorizedUserData = {
                        name: faker_1.faker.name.firstName(),
                        email: faker_1.faker.internet.email().toLocaleLowerCase(),
                        contact: faker_1.faker.phone.imei(),
                        password: faker_1.faker.mersenne.rand().toString(),
                        avatar: faker_1.faker.image.avatar(),
                    };
                    return [4 /*yield*/, (0, supertest_1.default)(__1.default)
                            .post("/api/signup")
                            .send(unauthorizedUserData)
                            .set("Authorization", "Bearer " + token(true))];
                case 3:
                    _a.sent();
                    return [4 /*yield*/, (0, supertest_1.default)(__1.default)
                            .post("/api/signin")
                            .send({
                            email: unauthorizedUserData.email,
                            password: unauthorizedUserData.password,
                        })];
                case 4:
                    signinResponseUnauthorizedUser = _a.sent();
                    newEstablishmentData = {
                        name: faker_1.faker.company.companyName(),
                        cnpj: faker_1.faker.mersenne.rand().toString(),
                        address: {
                            street: faker_1.faker.address.street(),
                            number: faker_1.faker.mersenne.rand(),
                            zipCode: faker_1.faker.address.zipCode(),
                            district: faker_1.faker.address.cityName(),
                        },
                        contact: faker_1.faker.phone.imei(),
                        urlLogo: faker_1.faker.image.imageUrl(),
                        userId: createUserResponse.body.id,
                    };
                    tokenUser = signinResponse.body.token;
                    tokenUnathorizedUser = signinResponseUnauthorizedUser.body.token;
                    return [4 /*yield*/, (0, supertest_1.default)(__1.default)
                            .post("/api/establishment")
                            .send(newEstablishmentData)
                            .set("Authorization", "Bearer ".concat(tokenUser))];
                case 5:
                    establishmentResponse = _a.sent();
                    establishmentId = establishmentResponse.body.id;
                    productData.establishmentId = establishmentId;
                    return [4 /*yield*/, (0, supertest_1.default)(__1.default)
                            .post("/api/product")
                            .send(productData)
                            .set("Authorization", "Bearer " + tokenUser)];
                case 6:
                    _a.sent();
                    return [4 /*yield*/, (0, supertest_1.default)(__1.default)
                            .get("/api/product/".concat(establishmentId))
                            .set("Authorization", "Bearer " + tokenUnathorizedUser)];
                case 7:
                    getProductsResponse = _a.sent();
                    expect(getProductsResponse.status).toBe(401);
                    return [2 /*return*/];
            }
        });
    }); });
});
//# sourceMappingURL=validateProductsGet.spec.js.map