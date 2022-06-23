"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateRandomNumbers = void 0;
var generateRandomNumbers = function (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};
exports.generateRandomNumbers = generateRandomNumbers;
//# sourceMappingURL=auxiliaryFunctions.js.map