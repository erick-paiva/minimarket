"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Establishment = void 0;
var typeorm_1 = require("typeorm");
var address_entity_1 = require("./address.entity");
var client_entity_1 = require("./client.entity");
var product_entity_1 = require("./product.entity");
var sale_entity_1 = require("./sale.entity");
var user_entity_1 = require("./user.entity");
var Establishment = /** @class */ (function () {
    function Establishment() {
    }
    __decorate([
        (0, typeorm_1.PrimaryGeneratedColumn)("uuid"),
        __metadata("design:type", String)
    ], Establishment.prototype, "id", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", String)
    ], Establishment.prototype, "name", void 0);
    __decorate([
        (0, typeorm_1.Column)({ unique: true }),
        __metadata("design:type", String)
    ], Establishment.prototype, "cnpj", void 0);
    __decorate([
        (0, typeorm_1.Column)({ unique: true }),
        __metadata("design:type", String)
    ], Establishment.prototype, "contact", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", String)
    ], Establishment.prototype, "urlLogo", void 0);
    __decorate([
        (0, typeorm_1.ManyToOne)(function (type) { return user_entity_1.User; }, function (user) { return user.establishments; }, {
            eager: true,
        }),
        (0, typeorm_1.JoinColumn)(),
        __metadata("design:type", user_entity_1.User)
    ], Establishment.prototype, "user", void 0);
    __decorate([
        (0, typeorm_1.OneToMany)(function (type) { return client_entity_1.Client; }, function (client) { return client.establishment; }, {
            eager: true,
        }),
        __metadata("design:type", Array)
    ], Establishment.prototype, "clients", void 0);
    __decorate([
        (0, typeorm_1.OneToMany)(function (type) { return product_entity_1.Product; }, function (product) { return product.establishment; }, {
            eager: true,
        }),
        __metadata("design:type", Array)
    ], Establishment.prototype, "products", void 0);
    __decorate([
        (0, typeorm_1.OneToOne)(function (type) { return address_entity_1.Address; }, {
            eager: true,
        }),
        (0, typeorm_1.JoinColumn)(),
        __metadata("design:type", address_entity_1.Address)
    ], Establishment.prototype, "address", void 0);
    __decorate([
        (0, typeorm_1.OneToMany)(function (type) { return sale_entity_1.Sale; }, function (sale) { return sale.establishment; }, {
            eager: true,
        }),
        __metadata("design:type", Array)
    ], Establishment.prototype, "sales", void 0);
    Establishment = __decorate([
        (0, typeorm_1.Entity)("establishments")
    ], Establishment);
    return Establishment;
}());
exports.Establishment = Establishment;
//# sourceMappingURL=establishment.entity.js.map