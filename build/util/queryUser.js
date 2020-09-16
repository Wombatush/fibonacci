"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.queryUserForIntGreaterThanZero = exports.queryUserForInt = exports.queryUserForNumber = exports.queryUserForString = exports.queryUser = exports.DefaultValidatorIntGreaterThanZero = exports.DefaultValidatorInt = exports.DefaultValidatorNumber = exports.DefaultValidatorString = exports.DefaultParserInt = exports.DefaultParserString = void 0;
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
function queryUser(rl, question, callback, parse, validate) {
    rl.question(question + "\n", function (answer) {
        var parsed = parse(answer);
        var error = validate(parsed);
        if (error) {
            console.log(error.message);
            setImmediate(function () { return queryUser(rl, question, callback, parse, validate); });
        }
        else {
            setImmediate(function () { return callback(parsed); });
        }
    });
}
exports.queryUser = queryUser;
function queryUserForString(rl, question, callback, validate) {
    if (validate === void 0) { validate = undefined; }
    queryUser(rl, question, callback, exports.DefaultParserString, validate || exports.DefaultValidatorString);
}
exports.queryUserForString = queryUserForString;
function queryUserForNumber(rl, question, callback, validate) {
    if (validate === void 0) { validate = undefined; }
    queryUser(rl, question, callback, exports.DefaultParserInt, validate || exports.DefaultValidatorNumber);
}
exports.queryUserForNumber = queryUserForNumber;
function queryUserForInt(rl, question, callback) {
    queryUserForNumber(rl, question, callback, exports.DefaultValidatorInt);
}
exports.queryUserForInt = queryUserForInt;
function queryUserForIntGreaterThanZero(rl, question, callback) {
    queryUserForNumber(rl, question, callback, exports.DefaultValidatorIntGreaterThanZero);
}
exports.queryUserForIntGreaterThanZero = queryUserForIntGreaterThanZero;
