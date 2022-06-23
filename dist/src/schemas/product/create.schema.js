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
exports.serializedCreateproductSchema = exports.productUpdateSchema = exports.createProductSchema = void 0;
var yup = __importStar(require("yup"));
var createProductSchema = yup.object().shape({
    name: yup.string().required(),
    description: yup.string().required(),
    salePrice: yup.number().required(),
    costPrice: yup.number().required(),
    unitType: yup.string().required(),
    urlImg: yup.string().required(),
    establishmentId: yup.string().required(),
    categories: yup.array().of(yup.string()).required(),
});
exports.createProductSchema = createProductSchema;
var productUpdateSchema = yup.object().shape({
    name: yup.string().optional(),
    description: yup.string().optional(),
    salePrice: yup.string().optional(),
    costPrice: yup.string().optional(),
    unitType: yup.string().optional(),
    urlImg: yup.string().optional(),
    categories: yup.array().of(yup.string()).optional(),
});
exports.productUpdateSchema = productUpdateSchema;
var responseObject = {
    id: yup.string().uuid().required(),
    name: yup.string().required(),
    description: yup.string().required(),
    salePrice: yup.string().required(),
    costPrice: yup.string().required(),
    unitType: yup.string().required(),
    urlImg: yup.string().required(),
    categories: yup
        .array()
        .of(yup.object().shape({
        name: yup.string().required(),
        image: yup.string().required(),
    }))
        .optional(),
};
var newShape = Object.entries(responseObject)
    .reverse()
    .reduce(function (prev, _a) {
    var _b;
    var key = _a[0], value = _a[1];
    return (__assign(__assign({}, prev), (_b = {}, _b[key] = value, _b)));
}, {});
var serializedCreateproductSchema = yup.object().shape(newShape);
exports.serializedCreateproductSchema = serializedCreateproductSchema;
//# sourceMappingURL=create.schema.js.map