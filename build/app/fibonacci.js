"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Fibonacci = void 0;
var algorithms_1 = require("./algorithms");
var PREFERRED_SAMPLE_COUNT = 1000;
var Fibonacci = /** @class */ (function () {
    function Fibonacci(sampleCount) {
        if (sampleCount === void 0) { sampleCount = PREFERRED_SAMPLE_COUNT; }
        this.cache = [0, 1];
        for (var i = this.cache.length; i < sampleCount; ++i) {
            this.cache[i] = this.cache[i - 2] + this.cache[i - 1];
        }
    }
    Fibonacci.prototype.isFibonacci = function (number) {
        return algorithms_1.binarySearch(this.cache, number) !== undefined;
    };
    return Fibonacci;
}());
exports.Fibonacci = Fibonacci;
