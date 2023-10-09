"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
class CredentialsModel {
    // Constructor to initialize properties
    constructor(credentials) {
        this.email = credentials.email;
        this.password = credentials.password;
    }
    // Validate the credentials against the schema
    validate() {
        var _a;
        const result = CredentialsModel.validationSchema.validate(this);
        return (_a = result.error) === null || _a === void 0 ? void 0 : _a.message;
    }
}
// Joi schema for validating credentials
CredentialsModel.validationSchema = joi_1.default.object({
    email: joi_1.default.string().required().min(4).max(100),
    password: joi_1.default.string().required().min(4).max(100)
});
exports.default = CredentialsModel;
//# sourceMappingURL=credentials-model.js.map