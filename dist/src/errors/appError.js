"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleError = exports.UserError = exports.AppError = void 0;
var AppError = /** @class */ (function (_super) {
    __extends(AppError, _super);
    function AppError(statusCode, message) {
        var _this = _super.call(this) || this;
        _this.statusCode = statusCode;
        _this.message = message;
        return _this;
    }
    return AppError;
}(Error));
exports.AppError = AppError;
var UserError = /** @class */ (function () {
    function UserError(statusCode, message) {
        this.statusCode = statusCode;
        this.message = message;
    }
    return UserError;
}());
exports.UserError = UserError;
var handleError = function (err, res) {
    var statusCode = err.statusCode, message = err.message;
    return res.status(statusCode).json({ error: message });
};
exports.handleError = handleError;
//# sourceMappingURL=appError.js.map