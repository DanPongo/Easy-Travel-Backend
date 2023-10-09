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
const dal_1 = __importDefault(require("../2-utils/dal"));
const cyber_1 = __importDefault(require("../2-utils/cyber"));
const error_models_1 = require("../4-models/error-models");
const role_model_1 = __importDefault(require("../4-models/role-model"));
function register(user) {
    return __awaiter(this, void 0, void 0, function* () {
        // Validation:
        const error = user.validate();
        if (error)
            throw new error_models_1.ValidationError(error);
        const usersSql = "SELECT * FROM users";
        const users = yield dal_1.default.execute(usersSql);
        //email taken:
        if (users.some(u => u.email === user.email)) {
            throw new error_models_1.ValidationError("email already taken");
        }
        user.roleId = role_model_1.default.user;
        // Hash
        user.password = cyber_1.default.hash(user.password);
        // SQL inject:
        const sql = `INSERT INTO users VALUES(DEFAULT, ?, ?, ?, ?, ?)`;
        const result = yield dal_1.default.execute(sql, [user.firstName, user.lastName, user.email, user.password, user.roleId]);
        user.userId = result.insertId;
        const token = cyber_1.default.getNewToken(user);
        return token;
    });
}
function login(credentials) {
    return __awaiter(this, void 0, void 0, function* () {
        // Validation:
        const error = credentials.validate();
        if (error)
            throw new error_models_1.ValidationError(error);
        // Hash password:
        credentials.password = cyber_1.default.hash(credentials.password);
        // SQL Injection blocked - Prepared statement:
        const sql = `SELECT * FROM users WHERE email = ? AND password = ?`;
        const users = yield dal_1.default.execute(sql, [credentials.email, credentials.password]);
        if (users.length === 0)
            throw new error_models_1.UnauthorizedError("Incorrect email or password");
        const user = users[0];
        const token = cyber_1.default.getNewToken(user);
        return token;
    });
}
// To get a user by id and get information about him like name in the navbar
function getOneUser(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const sql = `SELECT * FROM users WHERE userId = ?`;
        const users = yield dal_1.default.execute(sql, [id]);
        if (users.length === 0)
            throw new error_models_1.ResourceNotFoundError(id);
        const user = users[0];
        return user;
    });
}
exports.default = {
    register,
    login,
    getOneUser
};
//# sourceMappingURL=auth-logic.js.map