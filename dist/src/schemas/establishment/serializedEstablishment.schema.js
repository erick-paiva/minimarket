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
exports.serializedObjEstablishmentSchema = exports.serializedArrEstablishmentSchema = void 0;
var yup = __importStar(require("yup"));
var utils_1 = require("../../utils");
var objectShape = {
    id: yup.string().required(),
    name: yup.string().required(),
    cnpj: yup.string().required(),
    contact: yup.string().required(),
    urlLogo: yup.string().required(),
    address: yup.object().shape({
        street: yup.string().required(),
        number: yup.number().required(),
        zipCode: yup.string().required(),
        district: yup.string().required(),
    }),
    user: yup.object().shape({
        email: yup.string().required(),
        name: yup.string().required(),
        id: yup.string().required(),
    }),
};
var serializedArrEstablishmentSchema = yup
    .array()
    .of(yup.object().shape((0, utils_1.newShape)(objectShape)));
exports.serializedArrEstablishmentSchema = serializedArrEstablishmentSchema;
var serializedObjEstablishmentSchema = yup
    .object()
    .shape((0, utils_1.newShape)(objectShape));
exports.serializedObjEstablishmentSchema = serializedObjEstablishmentSchema;
//# sourceMappingURL=serializedEstablishment.schema.js.map