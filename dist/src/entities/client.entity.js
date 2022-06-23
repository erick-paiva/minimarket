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
exports.Client = void 0;
var typeorm_1 = require("typeorm");
var establishment_entity_1 = require("./establishment.entity");
var sale_entity_1 = require("./sale.entity");
var Client = /** @class */ (function () {
    function Client() {
    }
    __decorate([
        (0, typeorm_1.PrimaryGeneratedColumn)("uuid"),
        __metadata("design:type", String)
    ], Client.prototype, "id", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", String)
    ], Client.prototype, "name", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", String)
    ], Client.prototype, "avatar", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", String)
    ], Client.prototype, "contact", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", Number)
    ], Client.prototype, "payDay", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", Boolean)
    ], Client.prototype, "isDeptor", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", Boolean)
    ], Client.prototype, "isLate", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", Boolean)
    ], Client.prototype, "isActivate", void 0);
    __decorate([
        (0, typeorm_1.ManyToOne)(function (type) { return establishment_entity_1.Establishment; }, function (establishment) { return establishment.clients; }),
        __metadata("design:type", establishment_entity_1.Establishment)
    ], Client.prototype, "establishment", void 0);
    __decorate([
        (0, typeorm_1.OneToMany)(function (type) { return sale_entity_1.Sale; }, function (sale) { return sale.client; }, {
            eager: true,
        }),
        __metadata("design:type", Array)
    ], Client.prototype, "sales", void 0);
    Client = __decorate([
        (0, typeorm_1.Entity)("clients")
    ], Client);
    return Client;
}());
exports.Client = Client;
//# sourceMappingURL=client.entity.js.map