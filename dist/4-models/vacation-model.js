"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
class VacationModel {
    constructor(vacation) {
        this.vacationId = vacation.vacationId;
        this.description = vacation.description;
        this.destination = vacation.destination;
        this.imageName = vacation.imageName;
        this.checkIn = vacation.checkIn;
        this.checkOut = vacation.checkOut;
        this.price = vacation.price;
        if (vacation.image) { // Handle the optional image in the constructor
            this.image = vacation.image;
        }
    }
    validate() {
        var _a;
        const result = VacationModel.validationSchema.validate(this);
        return (_a = result.error) === null || _a === void 0 ? void 0 : _a.message;
    }
}
VacationModel.validationSchema = joi_1.default.object({
    vacationId: joi_1.default.number().optional().integer().positive(),
    description: joi_1.default.string().required().min(10).max(2500),
    destination: joi_1.default.string().required().min(2).max(70),
    imageName: joi_1.default.string().optional(),
    checkIn: joi_1.default.string().required().min(2).max(20),
    checkOut: joi_1.default.string().required().min(2).max(20),
    price: joi_1.default.number().required().min(90).max(40000),
    image: joi_1.default.object().optional()
});
exports.default = VacationModel;
//# sourceMappingURL=vacation-model.js.map