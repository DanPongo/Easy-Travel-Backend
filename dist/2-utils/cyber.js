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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const role_model_1 = __importDefault(require("../4-models/role-model"));
const crypto_1 = __importDefault(require("crypto"));
const secretKey = "ChickenLittle";
function getNewToken(user) {
    // Delete password from user object:
    delete user.password;
    //container
    const container = { user };
    // Create expiration time:
    const options = { expiresIn: "3h" };
    // Generate token:
    const token = jsonwebtoken_1.default.sign(container, secretKey, options);
    return token;
}
// promise function to verify token
function verifyToken(request) {
    return new Promise((resolve, reject) => {
        try {
            // Extract header:
            const header = request.header("authorization");
            // If no such header:
            if (!header) {
                resolve(false);
                return;
            }
            // Extract token from header:
            const token = header.substring(7);
            // If there is no token:
            if (!token) {
                resolve(false);
                return;
            }
            //Verify token:
            jsonwebtoken_1.default.verify(token, secretKey, err => {
                // If token is illegal:
                if (err) {
                    resolve(false);
                    return;
                }
                //    legal token
                resolve(true);
            });
        }
        catch (err) {
            reject(err);
        }
    });
}
const salt = "MakeThingsGoRight";
function hash(plaintext) {
    if (!plaintext)
        return null;
    // Hash with salt:
    const hashedText = crypto_1.default.createHmac("sha512", salt).update(plaintext).digest("hex");
    return hashedText;
}
function verifyAdmin(request) {
    return __awaiter(this, void 0, void 0, function* () {
        // First check if user logged in:
        const isLoggedIn = yield verifyToken(request);
        //If not logged in:
        if (!isLoggedIn)
            return false;
        // Extract header:
        const header = request.header("authorization");
        //Extract token:
        const token = header.substring(7);
        // Extract container from token:
        const container = jsonwebtoken_1.default.decode(token);
        //Extract user:
        const user = container.user;
        //Return if user is admin, otherwise return false:
        return user.roleId === role_model_1.default.admin;
    });
}
function verifyUser(request) {
    return __awaiter(this, void 0, void 0, function* () {
        const isLoggedIn = yield verifyToken(request);
        if (!isLoggedIn)
            return false;
        const header = request.header("authorization");
        const token = header.substring(7);
        const container = jsonwebtoken_1.default.decode(token);
        const user = container.user;
        return user.roleId === role_model_1.default.user;
    });
}
exports.default = {
    getNewToken,
    verifyToken,
    hash,
    verifyAdmin,
    verifyUser,
};
//# sourceMappingURL=cyber.js.map