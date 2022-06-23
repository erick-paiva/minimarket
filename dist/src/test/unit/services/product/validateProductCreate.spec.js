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
var faker_1 = require("@faker-js/faker");
var dotenv_1 = require("dotenv");
var data_source_1 = require("../../../../data-source");
var supertest_1 = __importDefault(require("supertest"));
var __1 = __importDefault(require("../../../.."));
var jsonwebtoken_1 = require("jsonwebtoken");
(0, dotenv_1.config)();
describe("Create product test", function () {
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
        salePrice: faker_1.faker.mersenne.rand(6, 15),
        costPrice: faker_1.faker.mersenne.rand(1, 5),
        unitType: faker_1.faker.lorem.word(),
        urlImg: faker_1.faker.image.imageUrl(),
        establishmentId: "",
        categories: [],
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
    test("Should be able to create a new product", function () { return __awaiter(void 0, void 0, void 0, function () {
        var createUserResponse, establishmentResponse, response;
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
                    productData.establishmentId = establishmentResponse.body.id;
                    return [4 /*yield*/, (0, supertest_1.default)(__1.default)
                            .post("/api/product")
                            .send(productData)
                            .set("Authorization", "Bearer " + token(true))];
                case 3:
                    response = _a.sent();
                    expect(response.status).toBe(201);
                    expect(response.body).toHaveProperty("id");
                    expect(response.body).toHaveProperty("name");
                    expect(response.body).toHaveProperty("description");
                    expect(response.body).toHaveProperty("salePrice");
                    expect(response.body).toHaveProperty("costPrice");
                    expect(response.body).toHaveProperty("unitType");
                    expect(response.body).toHaveProperty("urlImg");
                    expect(response.body).toHaveProperty("categories");
                    return [2 /*return*/];
            }
        });
    }); });
    test("Should be return status code 409 if product name already exists", function () { return __awaiter(void 0, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, supertest_1.default)(__1.default)
                        .post("/api/product")
                        .send(productData)
                        .set("Authorization", "Bearer " + token(true))];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, (0, supertest_1.default)(__1.default)
                            .post("/api/product")
                            .send(productData)
                            .set("Authorization", "Bearer " + token(true))];
                case 2:
                    response = _a.sent();
                    expect(response.status).toBe(409);
                    expect(response.body).toHaveProperty("error");
                    return [2 /*return*/];
            }
        });
    }); });
    test("Should be return status code 400 if request do not have token", function () { return __awaiter(void 0, void 0, void 0, function () {
        var productResponse;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    productData.name = faker_1.faker.name.firstName();
                    return [4 /*yield*/, (0, supertest_1.default)(__1.default)
                            .post("/api/product")
                            .send(productData)];
                case 1:
                    productResponse = _a.sent();
                    expect(productResponse.status).toBe(400);
                    expect(productResponse.body).toHaveProperty("error");
                    return [2 /*return*/];
            }
        });
    }); });
    test("Should be return 400 if request do not have product name", function () { return __awaiter(void 0, void 0, void 0, function () {
        var productDataWithoutName, productResponse;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    productDataWithoutName = {
                        description: faker_1.faker.lorem.paragraph(),
                        salePrice: faker_1.faker.mersenne.rand(6, 15),
                        costPrice: faker_1.faker.mersenne.rand(1, 5),
                        unitType: faker_1.faker.lorem.word(),
                        urlImg: faker_1.faker.image.imageUrl(),
                        establishmentId: "",
                    };
                    return [4 /*yield*/, (0, supertest_1.default)(__1.default)
                            .post("/api/product")
                            .send(productDataWithoutName)
                            .set("Authorization", "Bearer " + token(true))];
                case 1:
                    productResponse = _a.sent();
                    expect(productResponse.status).toBe(400);
                    expect(productResponse.body).toHaveProperty("message");
                    return [2 /*return*/];
            }
        });
    }); });
    test("Should be return status 404 if body request establishmentId do not exists", function () { return __awaiter(void 0, void 0, void 0, function () {
        var productResponse;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    productData.establishmentId = "************************************";
                    return [4 /*yield*/, (0, supertest_1.default)(__1.default)
                            .post("/api/product")
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
});
//# sourceMappingURL=validateProductCreate.spec.js.map