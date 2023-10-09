"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
// Errors log file:
const errorsLogFile = path_1.default.resolve(__dirname, "../errors.log");
const activitiesLogFile = path_1.default.resolve(__dirname, "../activities.log");
// Log error:
function logError(message, err) {
    const now = new Date();
    let msgToLog = now.toUTCString() + "\n";
    msgToLog += message + "\n";
    if (typeof err === "string")
        msgToLog += err + "\n";
    if (err === null || err === void 0 ? void 0 : err.stack)
        msgToLog += `Stack: ${err.stack}\n`;
    fs_1.default.appendFile(errorsLogFile, msgToLog, () => { });
}
// Log error:
function logActivity(message) {
    const now = new Date();
    let msgToLog = now.toUTCString() + "\n";
    msgToLog += message + "\n";
    fs_1.default.appendFile(activitiesLogFile, msgToLog, () => { });
}
exports.default = {
    logError,
    logActivity
};
//# sourceMappingURL=logger.js.map