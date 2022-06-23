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
exports.userUpdateSchema = exports.serializedAllUsers = exports.serializedOneUser = void 0;
var bcrypt_1 = require("bcrypt");
var yup = __importStar(require("yup"));
var responseObject = {
    id: yup.string().uuid().required(),
    name: yup.string().required(),
    email: yup.string().email().lowercase().required(),
    contact: yup.string().required(),
    avatar: yup.string().required(),
    isAdmin: yup.boolean().required(),
    isActive: yup.boolean().required(),
    createdAt: yup.date().optional(),
    updatedAt: yup.date().optional(),
};
var newShape = Object.entries(responseObject)
    .reverse()
    .reduce(function (prev, _a) {
    var _b;
    var key = _a[0], value = _a[1];
    return (__assign(__assign({}, prev), (_b = {}, _b[key] = value, _b)));
}, {});
var serializedOneUser = yup.object().shape(newShape);
exports.serializedOneUser = serializedOneUser;
var serializedAllUsers = yup.array().of(yup.object().shape(newShape));
exports.serializedAllUsers = serializedAllUsers;
var userUpdateSchema = yup.object().shape({
    name: yup.string().optional(),
    email: yup.string().email().lowercase().optional(),
    contact: yup.string().optional(),
    avatar: yup.string().optional(),
    password: yup
        .string()
        .transform(function (pwd) { return (0, bcrypt_1.hashSync)(pwd, 8); })
        .optional(),
});
exports.userUpdateSchema = userUpdateSchema;
//# sourceMappingURL=user.schema.js.map