"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
class followerModel {
    constructor(userId, vacationId) {
        this.userId = userId;
        this.vacationId = vacationId;
    }
    validate() {
        var _a;
        const result = followerModel.validationSchema.validate(this);
        return (_a = result.error) === null || _a === void 0 ? void 0 : _a.message;
    }
}
followerModel.validationSchema = joi_1.default.object({
    userId: joi_1.default.number().required().positive(),
    vacationId: joi_1.default.number().required().positive()
});
exports.default = followerModel;
//# sourceMappingURL=follower-model.js.map