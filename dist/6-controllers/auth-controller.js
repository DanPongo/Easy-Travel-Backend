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
const express_1 = __importDefault(require("express"));
const verify_logged_in_1 = __importDefault(require("../3-middleware/verify-logged-in"));
const credentials_model_1 = __importDefault(require("../4-models/credentials-model"));
const user_model_1 = __importDefault(require("../4-models/user-model"));
const auth_logic_1 = __importDefault(require("../5-logic/auth-logic"));
const router = express_1.default.Router(); //capital R
// POST http://localhost:3001/api/auth/register
router.post("/auth/register", (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = new user_model_1.default(request.body);
        const token = yield auth_logic_1.default.register(user);
        response.status(201).json(token);
    }
    catch (err) {
        next(err);
    }
}));
// POST http://localhost:3001/api/auth/login
router.post("/auth/login", (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const credentials = new credentials_model_1.default(request.body);
        const token = yield auth_logic_1.default.login(credentials);
        response.json(token);
    }
    catch (err) {
        next(err);
    }
}));
// GET http://localhost:3001/api/users
router.get("/users/:id", verify_logged_in_1.default, (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = +request.params.id;
        const user = yield auth_logic_1.default.getOneUser(id);
        response.json(user);
    }
    catch (err) {
        next(err);
    }
}));
exports.default = router;
//# sourceMappingURL=auth-controller.js.map