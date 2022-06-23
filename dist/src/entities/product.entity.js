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
exports.Product = void 0;
var typeorm_1 = require("typeorm");
var category_entity_1 = require("./category.entity");
var establishment_entity_1 = require("./establishment.entity");
var Product = /** @class */ (function () {
    function Product() {
    }
    __decorate([
        (0, typeorm_1.PrimaryGeneratedColumn)("uuid"),
        __metadata("design:type", String)
    ], Product.prototype, "id", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", String)
    ], Product.prototype, "name", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", String)
    ], Product.prototype, "description", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "numeric" }),
        __metadata("design:type", Number)
    ], Product.prototype, "salePrice", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "numeric" }),
        __metadata("design:type", Number)
    ], Product.prototype, "costPrice", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", String)
    ], Product.prototype, "unitType", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", String)
    ], Product.prototype, "urlImg", void 0);
    __decorate([
        (0, typeorm_1.ManyToOne)(function (type) { return establishment_entity_1.Establishment; }, function (establishment) { return establishment.products; }),
        __metadata("design:type", establishment_entity_1.Establishment)
    ], Product.prototype, "establishment", void 0);
    __decorate([
        (0, typeorm_1.ManyToMany)(function (type) { return category_entity_1.Category; }, {
            eager: true,
        }),
        (0, typeorm_1.JoinTable)(),
        __metadata("design:type", Array)
    ], Product.prototype, "categories", void 0);
    Product = __decorate([
        (0, typeorm_1.Entity)("products")
    ], Product);
    return Product;
}());
exports.Product = Product;
//# sourceMappingURL=product.entity.js.map