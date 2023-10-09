"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
class UserModel {
    constructor(user) {
        this.userId = user.userId;
        this.firstName = user.firstName;
        this.lastName = user.lastName;
        this.email = user.email;
        this.password = user.password;
        this.roleId = user.roleId;
    }
    validate() {
        var _a;
        const result = UserModel.validationSchema.validate(this);
        return (_a = result.error) === null || _a === void 0 ? void 0 : _a.message;
    }
}
UserModel.validationSchema = joi_1.default.object({
    userId: joi_1.default.number().optional().integer().positive(),
    firstName: joi_1.default.string().required().min(2).max(20),
    lastName: joi_1.default.string().required().min(2).max(20),
    email: joi_1.default.string().required().min(4).max(100),
    password: joi_1.default.string().required().min(4).max(100),
    roleId: joi_1.default.forbidden()
});
exports.default = UserModel;
//# sourceMappingURL=user-model.js.map