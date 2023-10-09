"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cyber_1 = __importDefault(require("../2-utils/cyber"));
const error_models_1 = require("../4-models/error-models");
function verifyAdmin(request, response, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // Log the headers to check if the token is present.
            console.log("Request Headers: ", request.headers);
            //admin verification.
            const isAdmin = yield cyber_1.default.verifyAdmin(request);
            //result of admin verification.
            console.log("Is Admin: ", isAdmin);
            // If not admin, throw an UnauthorizedError.
            if (!isAdmin)
                throw new error_models_1.UnauthorizedError("Log in..");
            // if it is admin, pass control to the next middleware or route handler.
            next();
        }
        catch (err) {
            // Log the error message and optionally other error details.
            console.error("Error verifying admin: ", err.message);
            if (err.stack)
                console.error("Error Stack: ", err.stack); // Log the error stack if available.
            // Pass the error to the next error handling middleware.
            next(err);
        }
    });
}
// Export the middleware.
exports.default = verifyAdmin;
//# sourceMappingURL=verify-admin.js.map