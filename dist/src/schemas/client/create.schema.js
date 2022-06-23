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
exports.clientUpdateSchema = exports.serializedCreateClientSchema = exports.createClientSchema = void 0;
var yup = __importStar(require("yup"));
var createClientSchema = yup.object().shape({
    name: yup.string().required(),
    avatar: yup.string().required(),
    contact: yup.string().required(),
    payDay: yup.number().required(),
    isDeptor: yup.boolean().default(false),
    isLate: yup.boolean().default(false),
    isActivate: yup.boolean().default(true),
    establishmentId: yup.string().required(),
});
exports.createClientSchema = createClientSchema;
var responseObject = {
    id: yup.string().required(),
    name: yup.string().required(),
    avatar: yup.string().required(),
    contact: yup.string().required(),
    payDay: yup.number().required(),
    isDeptor: yup.boolean().required(),
    isLate: yup.boolean().required(),
    isActivate: yup.boolean().required(),
};
var clientUpdateSchema = yup.object().shape({
    name: yup.string().optional(),
    avatar: yup.string().optional(),
    contact: yup.string().optional(),
    payDay: yup.number().optional(),
    isDeptor: yup.boolean().optional(),
    isLate: yup.boolean().optional(),
    isActivate: yup.boolean().optional(),
});
exports.clientUpdateSchema = clientUpdateSchema;
var newShape = Object.entries(responseObject)
    .reverse()
    .reduce(function (prev, _a) {
    var _b;
    var key = _a[0], value = _a[1];
    return (__assign(__assign({}, prev), (_b = {}, _b[key] = value, _b)));
}, {});
var serializedCreateClientSchema = yup.object().shape(newShape);
exports.serializedCreateClientSchema = serializedCreateClientSchema;
//# sourceMappingURL=create.schema.js.map