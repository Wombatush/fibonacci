"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommandLineHost = exports.CommandLineHostFactory = void 0;
var commands_1 = require("./commands");
var io_1 = require("./io");
exports.CommandLineHostFactory = function (logicFactory) { return new CommandLineHost(logicFactory); };
var CommandLineHost = /** @class */ (function () {
    function CommandLineHost(logicFactory) {
        this.logic = null;
        this.output = new io_1.CommandLineOutput();
        this.input = new io_1.CommandLineInput(this.output);
        this.factory = logicFactory;
    }
    CommandLineHost.prototype.run = function () {
        var _this = this;
        io_1.queryUserForIntGreaterThanZero(this.input, "Please input the number of time in seconds between emitting numbers and their frequency", function (x) { return _this.onIntervalReady(x); });
    };
    CommandLineHost.prototype.loop = function () {
        var _this = this;
        this.input.queryUser("Please enter the next number", function (x) { return _this.onNext(x); }, CommandLineHost.parse, CommandLineHost.validate);
    };
    CommandLineHost.prototype.onIntervalReady = function (intervalInSec) {
        var _this = this;
        this.logic = this.factory(this.input, this.output, intervalInSec);
        io_1.queryUserForInt(this.input, "Please enter the first number", function (x) { return _this.onFirstNumberReady(x); });
    };
    CommandLineHost.prototype.onFirstNumberReady = function (firstNumber) {
        var _this = this;
        this.logic.addNumber(firstNumber);
        this.logic.checkFibonacci(firstNumber);
        this.logic.resume();
        setImmediate(function () { return _this.loop(); });
    };
    CommandLineHost.prototype.onNextNumberReady = function (nextNumber) {
        var _this = this;
        this.logic.addNumber(nextNumber);
        this.logic.checkFibonacci(nextNumber);
        setImmediate(function () { return _this.loop(); });
    };
    CommandLineHost.prototype.onNext = function (value) {
        if (commands_1.isCommandUserInput(value)) {
            switch (value) {
                case commands_1.QUIT_COMMAND:
                    this.onQuit();
                    return;
                case commands_1.HALT_COMMAND:
                    this.onHalt();
                    return;
                case commands_1.RESUME_COMMAND:
                    this.onResume();
                    return;
            }
        }
        this.onNextNumberReady(value);
    };
    CommandLineHost.prototype.onHalt = function () {
        var _this = this;
        this.logic.halt();
        this.output.log("Timer halted");
        setImmediate(function () { return _this.loop(); });
    };
    CommandLineHost.prototype.onResume = function () {
        var _this = this;
        this.logic.resume();
        this.output.log("Timer resumed");
        setImmediate(function () { return _this.loop(); });
    };
    CommandLineHost.prototype.onQuit = function () {
        this.logic.halt();
        this.logic.status();
        this.output.log("Thanks for playing, application will now exit.");
        this.input.close();
        setImmediate(function () { return process.exit(0); });
    };
    CommandLineHost.parse = function (value) {
        var number = parseInt(value);
        if (!isNaN(number)) {
            return number;
        }
        switch (value) {
            case commands_1.QUIT_COMMAND:
            case commands_1.HALT_COMMAND:
            case commands_1.RESUME_COMMAND:
                return value;
            default:
                return NaN;
        }
    };
    CommandLineHost.validate = function (value) {
        if (!commands_1.isNumberUserInput(value) && !commands_1.isCommandUserInput(value)) {
            return new Error("The number does not represent an integer.");
        }
        return null;
    };
    return CommandLineHost;
}());
exports.CommandLineHost = CommandLineHost;
