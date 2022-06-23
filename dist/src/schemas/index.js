"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.serializedArrSaleSchema = exports.serializedObjSaleSchema = exports.serializedCreateproductSchema = exports.productUpdateSchema = exports.createProductSchema = exports.clientUpdateSchema = exports.serializedCreateClientSchema = exports.createClientSchema = exports.serializedArrEstablishmentSchema = exports.serializedObjEstablishmentSchema = exports.updateEstablishmentSchema = exports.createEstablishmentSchema = exports.loginUserSchema = exports.serializedOneUser = exports.serializedAllUsers = exports.userUpdateSchema = exports.serializedCreateUserSchema = exports.createUserSchema = void 0;
/* USER*/
var create_schema_1 = require("./user/create.schema");
Object.defineProperty(exports, "createUserSchema", { enumerable: true, get: function () { return create_schema_1.createUserSchema; } });
Object.defineProperty(exports, "serializedCreateUserSchema", { enumerable: true, get: function () { return create_schema_1.serializedCreateUserSchema; } });
Object.defineProperty(exports, "loginUserSchema", { enumerable: true, get: function () { return create_schema_1.loginUserSchema; } });
var user_schema_1 = require("./user/user.schema");
Object.defineProperty(exports, "serializedAllUsers", { enumerable: true, get: function () { return user_schema_1.serializedAllUsers; } });
Object.defineProperty(exports, "serializedOneUser", { enumerable: true, get: function () { return user_schema_1.serializedOneUser; } });
Object.defineProperty(exports, "userUpdateSchema", { enumerable: true, get: function () { return user_schema_1.userUpdateSchema; } });
/* CLIENT*/
var create_schema_2 = require("./client/create.schema");
Object.defineProperty(exports, "createClientSchema", { enumerable: true, get: function () { return create_schema_2.createClientSchema; } });
Object.defineProperty(exports, "serializedCreateClientSchema", { enumerable: true, get: function () { return create_schema_2.serializedCreateClientSchema; } });
Object.defineProperty(exports, "clientUpdateSchema", { enumerable: true, get: function () { return create_schema_2.clientUpdateSchema; } });
/* ESTABLISHMENT*/
var establishment_1 = require("./establishment");
Object.defineProperty(exports, "createEstablishmentSchema", { enumerable: true, get: function () { return establishment_1.createEstablishmentSchema; } });
Object.defineProperty(exports, "serializedObjEstablishmentSchema", { enumerable: true, get: function () { return establishment_1.serializedObjEstablishmentSchema; } });
Object.defineProperty(exports, "serializedArrEstablishmentSchema", { enumerable: true, get: function () { return establishment_1.serializedArrEstablishmentSchema; } });
Object.defineProperty(exports, "updateEstablishmentSchema", { enumerable: true, get: function () { return establishment_1.updateEstablishmentSchema; } });
/* PRODUCT*/
var create_schema_3 = require("./product/create.schema");
Object.defineProperty(exports, "createProductSchema", { enumerable: true, get: function () { return create_schema_3.createProductSchema; } });
Object.defineProperty(exports, "productUpdateSchema", { enumerable: true, get: function () { return create_schema_3.productUpdateSchema; } });
Object.defineProperty(exports, "serializedCreateproductSchema", { enumerable: true, get: function () { return create_schema_3.serializedCreateproductSchema; } });
/* SALE*/
var serializedSale_schema_1 = require("./sale/serializedSale.schema");
Object.defineProperty(exports, "serializedObjSaleSchema", { enumerable: true, get: function () { return serializedSale_schema_1.serializedObjSaleSchema; } });
Object.defineProperty(exports, "serializedArrSaleSchema", { enumerable: true, get: function () { return serializedSale_schema_1.serializedArrSaleSchema; } });
//# sourceMappingURL=index.js.map