"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.serializedArrSaleSchema = exports.serializedObjSaleSchema = void 0;
var yup = __importStar(require("yup"));
var utils_1 = require("../../utils");
var serializedObject = {
    id: yup.string().uuid().required(),
    date: yup.date().required(),
    isPaid: yup.boolean().required(),
    paidDate: yup.date().required(),
    client: yup.object().shape({
        name: yup.string().required(),
        id: yup.string().required(),
    }),
    payment: yup.object().shape({
        id: yup.string().uuid().required(),
        formOfPagament: yup.string().required(),
    }),
    saleTotal: yup.number().required(),
    remainToPay: yup.number().required(),
    products: yup.array().of(yup.object().shape({
        name: yup.string().required(),
        id: yup.string().uuid().required(),
    })),
};
var serializedArrSaleSchema = yup
    .array()
    .of(yup.object().shape((0, utils_1.newShape)(serializedObject)));
exports.serializedArrSaleSchema = serializedArrSaleSchema;
var serializedObjSaleSchema = yup.object().shape((0, utils_1.newShape)(serializedObject));
exports.serializedObjSaleSchema = serializedObjSaleSchema;
//# sourceMappingURL=serializedSale.schema.js.map