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
const path_1 = __importDefault(require("path"));
const verify_admin_1 = __importDefault(require("../3-middleware/verify-admin"));
const verify_logged_in_1 = __importDefault(require("../3-middleware/verify-logged-in"));
const vacation_model_1 = __importDefault(require("../4-models/vacation-model"));
const vacations_logic_1 = __importDefault(require("../5-logic/vacations-logic"));
const router = express_1.default.Router(); // Capital R
// GET http://localhost:3001/api/vacations
router.get("/vacations", verify_admin_1.default, (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const vacations = yield vacations_logic_1.default.getAllVacations();
        response.json(vacations);
    }
    catch (err) {
        next(err);
    }
}));
// GET http://localhost:3001/api/vacations-users/:userId
router.get("/vacations-users/:userId([0-9]+)", verify_logged_in_1.default, (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = +request.params.userId;
        request.body.userId = userId;
        const vacations = yield vacations_logic_1.default.getVacationsForUser(userId);
        response.json(vacations);
    }
    catch (err) {
        next(err);
    }
}));
// GET http://localhost:3001/api/vacations/:vacationId
router.get("/vacations/:vacationId([0-9]+)", verify_admin_1.default, (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const vacationId = +request.params.vacationId;
        const vacation = yield vacations_logic_1.default.getOneVacation(vacationId); // Ensure you have this method in your logic
        if (!vacation) {
            return response.status(404).json({ message: "Vacation not found!" });
        }
        response.json(vacation);
    }
    catch (err) {
        next(err);
    }
}));
//GET http://localhost:3001/api/vacations/images/:imageName
router.get("/vacations/images/:imageName", (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const imageName = request.params.imageName;
        const absolutePath = path_1.default.join(__dirname, "..", "1-assets", "images", imageName);
        response.sendFile(absolutePath);
    }
    catch (err) {
        next(err);
    }
}));
// POST http://localhost:3001/api/vacations
router.post("/vacations", verify_admin_1.default, (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        // Take uploaded file, set it to the body:
        request.body.image = (_a = request.files) === null || _a === void 0 ? void 0 : _a.image;
        const vacation = new vacation_model_1.default(request.body);
        const addedVacation = yield vacations_logic_1.default.addVacation(vacation);
        response.status(201).json(addedVacation);
    }
    catch (err) {
        next(err);
    }
}));
// PUT http://localhost:3001/api/vacations/:vacationId
router.put("/vacations/:vacationId([0-9]+)", verify_admin_1.default, (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    try {
        const vacationId = +request.params.vacationId;
        request.body.vacationId = vacationId;
        // Take uploaded file, set it to the body:
        request.body.image = (_b = request.files) === null || _b === void 0 ? void 0 : _b.image;
        const vacation = new vacation_model_1.default(request.body);
        const updatedVacation = yield vacations_logic_1.default.updateVacation(vacation);
        response.json(updatedVacation);
    }
    catch (err) {
        next(err); // Catch-all middleware
    }
}));
// DELETE http://localhost:3001/api/vacations/:vacationId
router.delete("/vacations/:vacationId([0-9]+)", verify_admin_1.default, (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const vacationId = +request.params.vacationId;
        yield vacations_logic_1.default.deleteVacation(vacationId);
        response.sendStatus(204);
    }
    catch (err) {
        next(err);
    }
}));
exports.default = router;
//# sourceMappingURL=vacations-controller.js.map