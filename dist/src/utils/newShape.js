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
Object.defineProperty(exports, "__esModule", { value: true });
exports.newShape = void 0;
var newShape = function (shape) {
    return Object.entries(shape)
        .reverse()
        .reduce(function (prev, _a) {
        var _b;
        var key = _a[0], value = _a[1];
        return (__assign(__assign({}, prev), (_b = {}, _b[key] = value, _b)));
    }, {});
};
exports.newShape = newShape;
//# sourceMappingURL=newShape.js.map