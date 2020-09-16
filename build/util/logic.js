"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var MILLISECONDS_IN_SECOND = 1000;
var Application = /** @class */ (function () {
    // const numbers: Record<number, number> = { };
    function Application(intervalInSec) {
        this.timer = null;
        this.interval = intervalInSec * MILLISECONDS_IN_SECOND;
    }
    Application.prototype.halt = function () {
        if (this.timer) {
            clearInterval(this.timer);
            this.timer = null;
        }
    };
    Application.prototype.resume = function () {
        if (this.timer) {
        }
    };
    return Application;
}());
exports.default = Application;
