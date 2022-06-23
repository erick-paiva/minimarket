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
exports.Sale = void 0;
var typeorm_1 = require("typeorm");
var client_entity_1 = require("./client.entity");
var establishment_entity_1 = require("./establishment.entity");
var payment_entity_1 = require("./payment.entity");
var product_entity_1 = require("./product.entity");
var Sale = /** @class */ (function () {
    function Sale() {
    }
    __decorate([
        (0, typeorm_1.PrimaryGeneratedColumn)("uuid"),
        __metadata("design:type", String)
    ], Sale.prototype, "id", void 0);
    __decorate([
        (0, typeorm_1.CreateDateColumn)(),
        __metadata("design:type", Date)
    ], Sale.prototype, "date", void 0);
    __decorate([
        (0, typeorm_1.Column)({ nullable: true }),
        __metadata("design:type", String)
    ], Sale.prototype, "paidDate", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", Boolean)
    ], Sale.prototype, "isPaid", void 0);
    __decorate([
        (0, typeorm_1.ManyToOne)(function (type) { return client_entity_1.Client; }, function (client) { return client.sales; }),
        __metadata("design:type", client_entity_1.Client)
    ], Sale.prototype, "client", void 0);
    __decorate([
        (0, typeorm_1.ManyToOne)(function (type) { return payment_entity_1.Payment; }, {
            eager: true,
        }),
        (0, typeorm_1.JoinColumn)(),
        __metadata("design:type", payment_entity_1.Payment)
    ], Sale.prototype, "payment", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "numeric" }),
        __metadata("design:type", Number)
    ], Sale.prototype, "saleTotal", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "numeric" }),
        __metadata("design:type", Number)
    ], Sale.prototype, "remainToPay", void 0);
    __decorate([
        (0, typeorm_1.ManyToMany)(function (type) { return product_entity_1.Product; }, {
            eager: true,
        }),
        (0, typeorm_1.JoinTable)(),
        __metadata("design:type", Array)
    ], Sale.prototype, "products", void 0);
    __decorate([
        (0, typeorm_1.ManyToOne)(function () { return establishment_entity_1.Establishment; }),
        (0, typeorm_1.JoinColumn)([{ name: "establishmentId", referencedColumnName: "id" }]),
        __metadata("design:type", establishment_entity_1.Establishment)
    ], Sale.prototype, "establishment", void 0);
    Sale = __decorate([
        (0, typeorm_1.Entity)("sales")
    ], Sale);
    return Sale;
}());
exports.Sale = Sale;
//# sourceMappingURL=sale.entity.js.map