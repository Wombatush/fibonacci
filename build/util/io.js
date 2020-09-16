"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommandLineOutput = exports.CommandLineInput = exports.queryUserForIntGreaterThanZero = exports.queryUserForInt = exports.queryUserForString = exports.queryUserForNumber = exports.DefaultValidatorIntGreaterThanZero = exports.DefaultValidatorInt = exports.DefaultValidatorNumber = exports.DefaultValidatorString = exports.DefaultParserInt = exports.DefaultParserString = void 0;
var readline = __importStar(require("readline"));
exports.DefaultParserString = function (value) { return value; };
exports.DefaultParserInt = function (value) { return parseInt(value); };
exports.DefaultValidatorString = function () { return null; };
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
function queryUserForString(input, question, callback, validate) {
    if (validate === void 0) { validate = undefined; }
    input.queryUser(question, callback, exports.DefaultParserString, validate || exports.DefaultValidatorString);
}
exports.queryUserForString = queryUserForString;
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
        this.rl = readline.createInterface({
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
