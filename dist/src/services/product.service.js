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
var data_source_1 = require("../data-source");
var product_repository_1 = __importDefault(require("../repositories/product.repository"));
var establishment_repository_1 = __importDefault(require("../repositories/establishment.repository"));
var category_entity_1 = require("../entities/category.entity");
var ErrorHTTP_1 = __importDefault(require("../errors/ErrorHTTP"));
var schemas_1 = require("../schemas");
var ProductService = /** @class */ (function () {
    function ProductService() {
        var _this = this;
        this.createProduct = function (productToSave, userEmail, establishmentId, UserIsAdmin, categories) { return __awaiter(_this, void 0, void 0, function () {
            var categoryRepository, allCategoriesNames, allCategories, searchForEstablishment, establishmentOwner, establishmentProducts, productAlreadyExists, getCategories, getNewProduct;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        categoryRepository = data_source_1.AppDataSource.getRepository(category_entity_1.Category);
                        allCategoriesNames = [];
                        allCategories = [];
                        return [4 /*yield*/, categoryRepository.find()];
                    case 1:
                        (_a.sent()).forEach(function (category) {
                            allCategories.push(category);
                            allCategoriesNames.push(category.name);
                        });
                        return [4 /*yield*/, establishment_repository_1.default.findOne({
                                id: establishmentId,
                            })];
                    case 2:
                        searchForEstablishment = _a.sent();
                        if (!searchForEstablishment) {
                            throw new ErrorHTTP_1.default(404, "Establishment not found");
                        }
                        establishmentOwner = searchForEstablishment.user;
                        if (establishmentOwner.email !== userEmail && !UserIsAdmin) {
                            throw new ErrorHTTP_1.default(401, "You're not the owner of this establishment");
                        }
                        establishmentProducts = searchForEstablishment.products;
                        productAlreadyExists = establishmentProducts.find(function (product) {
                            return product.name.toLocaleLowerCase() ===
                                productToSave.name.toLocaleLowerCase();
                        });
                        if (productAlreadyExists) {
                            throw new ErrorHTTP_1.default(409, "You already have a product calls ".concat(productAlreadyExists.name.toLocaleLowerCase()));
                        }
                        categories.forEach(function (category) {
                            if (!allCategoriesNames.includes(category)) {
                                throw new ErrorHTTP_1.default(404, "The category ".concat(category, " is not valid"));
                            }
                        });
                        getCategories = function () {
                            var result = [];
                            categories.forEach(function (category) {
                                allCategories.forEach(function (repoCategory) {
                                    if (category === repoCategory.name) {
                                        result.push(repoCategory);
                                    }
                                });
                            });
                            return result;
                        };
                        productToSave.establishment = searchForEstablishment;
                        productToSave.categories = getCategories();
                        return [4 /*yield*/, product_repository_1.default.save(productToSave)];
                    case 3:
                        _a.sent();
                        return [4 /*yield*/, product_repository_1.default.findOne({
                                name: productToSave.name,
                            })];
                    case 4:
                        getNewProduct = _a.sent();
                        return [4 /*yield*/, schemas_1.serializedCreateproductSchema.validate(getNewProduct, {
                                stripUnknown: true,
                            })];
                    case 5: return [2 /*return*/, _a.sent()];
                }
            });
        }); };
        this.patchProduct = function (_a) {
            var validated = _a.validated, params = _a.params;
            return __awaiter(_this, void 0, void 0, function () {
                var id, product, updatedProduct;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            id = params.id;
                            return [4 /*yield*/, product_repository_1.default.findOne({ id: id })];
                        case 1:
                            product = _b.sent();
                            if (!product) {
                                throw new ErrorHTTP_1.default(404, "Product not found");
                            }
                            if (validated.categories !== undefined) {
                                throw new ErrorHTTP_1.default(404, "You cannot change categories");
                            }
                            return [4 /*yield*/, product_repository_1.default.update(product.id, __assign({}, validated))];
                        case 2:
                            _b.sent();
                            return [4 /*yield*/, product_repository_1.default.findOne({ id: id })];
                        case 3:
                            updatedProduct = _b.sent();
                            return [4 /*yield*/, schemas_1.serializedCreateproductSchema.validate(updatedProduct, {
                                    stripUnknown: true,
                                })];
                        case 4: return [2 /*return*/, _b.sent()];
                    }
                });
            });
        };
        this.getProducts = function (establishmentId, userEmail, UserIsAdmin) { return __awaiter(_this, void 0, void 0, function () {
            var searchForEstablishment, establishmentOwner, establishmentProducts;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, establishment_repository_1.default.findOne({
                            id: establishmentId,
                        })];
                    case 1:
                        searchForEstablishment = _a.sent();
                        if (!searchForEstablishment) {
                            throw new ErrorHTTP_1.default(404, "Establishment not found. Try with other establishmentId");
                        }
                        establishmentOwner = searchForEstablishment.user;
                        if (establishmentOwner.email !== userEmail && !UserIsAdmin) {
                            throw new ErrorHTTP_1.default(401, "You're not the owner of this establishment. So you can't see the products.");
                        }
                        establishmentProducts = searchForEstablishment.products;
                        return [2 /*return*/, establishmentProducts];
                }
            });
        }); };
    }
    return ProductService;
}());
exports.default = new ProductService();
//# sourceMappingURL=product.service.js.map