"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isFibonacci = exports.fibonacciNumbers = exports.fibonacciNumbersMax = void 0;
var binarySearch_1 = __importDefault(require("./binarySearch"));
exports.fibonacciNumbersMax = 1000;
exports.fibonacciNumbers = [0, 1];
for (var i = exports.fibonacciNumbers.length; i < exports.fibonacciNumbersMax; ++i) {
    exports.fibonacciNumbers[i] = exports.fibonacciNumbers[i - 2] + exports.fibonacciNumbers[i - 1];
}
function isFibonacci(number) {
    return binarySearch_1.default(exports.fibonacciNumbers, number) !== undefined;
}
exports.isFibonacci = isFibonacci;
