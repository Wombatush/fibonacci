"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommandLineOutput = exports.CommandLineInput = exports.queryUserForIntGreaterThanZero = exports.queryUserForInt = exports.queryUserForNumber = exports.DefaultValidatorIntGreaterThanZero = exports.DefaultValidatorInt = exports.DefaultValidatorNumber = exports.DefaultParserInt = void 0;
var readline_1 = __importDefault(require("readline"));
exports.DefaultParserInt = function (value) { return parseInt(value); };
exports.DefaultValidatorNumber = function () { return null; };
exports.DefaultValidatorInt = function (value) {
    if (isNaN(value)) {
        return new Error("The number does not represent an integer.");
    }
    return null;
};
exports.DefaultValidatorIntGreaterThanZero = function (value) {
    if (isNaN(value)) {
        return new Error("The number does not represent an integer.");
    }
    if (value <= 0) {
        return new Error("The number does not represent an integer greater than zero.");
    }
    return null;
};
function queryUserForNumber(input, question, callback, validate) {
    if (validate === void 0) { validate = undefined; }
    input.queryUser(question, callback, exports.DefaultParserInt, validate || exports.DefaultValidatorNumber);
}
exports.queryUserForNumber = queryUserForNumber;
function queryUserForInt(input, question, callback) {
    queryUserForNumber(input, question, callback, exports.DefaultValidatorInt);
}
exports.queryUserForInt = queryUserForInt;
function queryUserForIntGreaterThanZero(input, question, callback) {
    queryUserForNumber(input, question, callback, exports.DefaultValidatorIntGreaterThanZero);
}
exports.queryUserForIntGreaterThanZero = queryUserForIntGreaterThanZero;
var CommandLineInput = /** @class */ (function () {
    function CommandLineInput(output) {
        this.output = output;
        this.rl = readline_1.default.createInterface({
            input: process.stdin,
            output: process.stdout
        });
    }
    CommandLineInput.prototype.close = function () {
        this.rl.close();
    };
    CommandLineInput.prototype.queryUser = function (question, callback, parse, validate) {
        var self = this;
        self.rl.question(question + "\n", function (answer) {
            var _a;
            var parsed = parse(answer);
            var error = validate(parsed);
            if (error) {
                (_a = self.output) === null || _a === void 0 ? void 0 : _a.log(error.message);
                setImmediate(function () { return self.queryUser(question, callback, parse, validate); });
            }
            else {
                setImmediate(function () { return callback(parsed); });
            }
        });
    };
    return CommandLineInput;
}());
exports.CommandLineInput = CommandLineInput;
var CommandLineOutput = /** @class */ (function () {
    function CommandLineOutput() {
    }
    CommandLineOutput.prototype.log = function (message) {
        console.log(message);
    };
    return CommandLineOutput;
}());
exports.CommandLineOutput = CommandLineOutput;
