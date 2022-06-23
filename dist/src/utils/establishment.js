"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.identifiesIfTheRepositoryExists = void 0;
var identifiesIfTheRepositoryExists = function (repository) {
    var repositories = [
        "adresses",
        "establishments",
        "users",
        "clients",
        "categories",
        "products",
        "payments",
        "sales",
    ];
    var find = repositories.find(function (repo) { return repo.includes(repository); });
    if (!find) {
        return "";
    }
    return find;
};
exports.identifiesIfTheRepositoryExists = identifiesIfTheRepositoryExists;
//# sourceMappingURL=establishment.js.map