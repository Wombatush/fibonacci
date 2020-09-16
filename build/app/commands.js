"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isNumberUserInput = exports.isCommandUserInput = exports.RESUME_COMMAND = exports.HALT_COMMAND = exports.QUIT_COMMAND = void 0;
exports.QUIT_COMMAND = "quit";
exports.HALT_COMMAND = "halt";
exports.RESUME_COMMAND = "resume";
function isCommandUserInput(value) {
    return value === exports.QUIT_COMMAND
        || value === exports.HALT_COMMAND
        || value === exports.RESUME_COMMAND;
}
exports.isCommandUserInput = isCommandUserInput;
function isNumberUserInput(value) {
    return !isCommandUserInput(value) && !isNaN(value);
}
exports.isNumberUserInput = isNumberUserInput;
