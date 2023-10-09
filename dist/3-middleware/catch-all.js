"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_config_1 = __importDefault(require("../2-utils/app-config"));
const logger_1 = __importDefault(require("../2-utils/logger"));
function catchAll(err, request, response, next) {
    // Log on the console:
    console.log(err);
    const status = err.status || 500;
    // log server errors:
    if (status === 500) {
        // Log error log file:
        logger_1.default.logError("catchAll error", err);
    }
    // Return only on development: 
    const message = app_config_1.default.isDevelopment ? err.message : "Some error occurred, please try again";
    // Send back the error to front:
    response.status(status).send(message);
}
exports.default = catchAll;
//# sourceMappingURL=catch-all.js.map