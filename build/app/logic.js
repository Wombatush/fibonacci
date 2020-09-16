"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DefaultLogic = exports.DefaultLogicFactory = void 0;
var fibonacci_1 = require("./fibonacci");
var MILLISECONDS_IN_SECOND = 1000;
exports.DefaultLogicFactory = function (input, output, intervalInSec) { return new DefaultLogic(input, output, intervalInSec); };
var DefaultLogic = /** @class */ (function () {
    function DefaultLogic(input, output, intervalInSec, fibonacci) {
        this.numbers = {};
        this.timer = null;
        this.input = input;
        this.output = output;
        this.fibonacci = fibonacci || new fibonacci_1.Fibonacci();
        this.interval = intervalInSec * MILLISECONDS_IN_SECOND;
    }
    DefaultLogic.prototype.addNumber = function (number) {
        if (this.numbers[number]) {
            this.numbers[number] = ++this.numbers[number];
        }
        else {
            this.numbers[number] = 1;
        }
    };
    DefaultLogic.prototype.checkFibonacci = function (number) {
        if (this.fibonacci.isFibonacci(number)) {
            this.output.log("FIB");
        }
    };
    DefaultLogic.prototype.halt = function () {
        if (this.timer) {
            clearInterval(this.timer);
            this.timer = null;
        }
    };
    DefaultLogic.prototype.resume = function () {
        var _this = this;
        if (!this.timer) {
            this.timer = setInterval(function () { return _this.status(); }, this.interval);
        }
    };
    DefaultLogic.prototype.status = function () {
        var _this = this;
        var status = Object
            .keys(this.numbers)
            .map(function (key) { return key + ":" + _this.numbers[parseInt(key)]; })
            .join(", ");
        this.output.log(status);
    };
    return DefaultLogic;
}());
exports.DefaultLogic = DefaultLogic;
