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
const verify_user_1 = __importDefault(require("../3-middleware/verify-user"));
const follower_model_1 = __importDefault(require("../4-models/follower-model"));
const followers_logic_1 = __importDefault(require("../5-logic/followers-logic"));
const router = express_1.default.Router();
// POST http://localhost:3001/api/followers
router.post("/followers", verify_user_1.default, (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = +request.body.userId;
        const vacationId = +request.body.vacationId;
        const follower = new follower_model_1.default(userId, vacationId);
        const addedFollower = yield followers_logic_1.default.addFollower(follower);
        response.status(201).json(addedFollower);
    }
    catch (err) {
        next(err);
    }
}));
// DELETE http://localhost:3001/api/followers/:vacationId
router.delete("/followers/:vacationId([0-9]+)/:userId([0-9]+)", (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = +request.params.userId;
        const vacationId = +request.params.vacationId;
        yield followers_logic_1.default.deleteFollower(vacationId, userId);
        response.sendStatus(202);
    }
    catch (err) {
        next(err);
    }
}));
exports.default = router;
//# sourceMappingURL=followers-controller.js.map