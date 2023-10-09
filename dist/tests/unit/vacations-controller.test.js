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
const supertest_1 = __importDefault(require("supertest"));
const express_1 = __importDefault(require("express"));
const vacations_controller_1 = __importDefault(require("../../6-controllers/vacations-controller"));
const vacations_logic_1 = __importDefault(require("../../5-logic/vacations-logic"));
// Mock the verifyAdmin and verifyLoggedIn middlewares to allow the request
jest.mock("../../3-middleware/verify-admin", () => {
    return (_req, _res, next) => next();
});
jest.mock("../../3-middleware/verify-logged-in", () => {
    return (_req, _res, next) => next();
});
// Mock the external logic module
jest.mock("../../5-logic/vacations-logic");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use("/api", vacations_controller_1.default);
describe("Vacations Controller", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });
    it("should retrieve all vacations for admin", () => __awaiter(void 0, void 0, void 0, function* () {
        // Mock the vacationsLogic.getAllVacations method as needed
        vacations_logic_1.default.getAllVacations.mockResolvedValueOnce([{ /* mock vacation data */}]);
        const res = yield (0, supertest_1.default)(app).get("/api/vacations");
        expect(res.status).toBe(200);
        expect(res.body).toBeDefined();
    }));
    it("should retrieve vacations for a specific user", () => __awaiter(void 0, void 0, void 0, function* () {
        const userId = 1;
        // Mock the vacationsLogic.getVacationsForUser method as needed
        vacations_logic_1.default.getVacationsForUser.mockResolvedValueOnce([{ /* mock vacation data for user */}]);
        const res = yield (0, supertest_1.default)(app).get(`/api/vacations-users/${userId}`);
        expect(res.status).toBe(200);
        expect(res.body).toBeDefined();
    }));
    it("should add a vacation for admin", () => __awaiter(void 0, void 0, void 0, function* () {
        const vacationData = { /* mock vacation data, including an image property if necessary */};
        // Mock the vacationsLogic.addVacation method as needed
        vacations_logic_1.default.addVacation.mockResolvedValueOnce(vacationData);
        const res = yield (0, supertest_1.default)(app).post("/api/vacations").send(vacationData);
        expect(res.status).toBe(201);
        expect(res.body).toBeDefined();
    }));
    it("should update a vacation for admin", () => __awaiter(void 0, void 0, void 0, function* () {
        const vacationId = 123;
        const updatedVacationData = { /* mock updated vacation data */};
        // Mock the vacationsLogic.updateVacation method as needed
        vacations_logic_1.default.updateVacation.mockResolvedValueOnce(updatedVacationData);
        const res = yield (0, supertest_1.default)(app).put(`/api/vacations/${vacationId}`).send(updatedVacationData);
        expect(res.status).toBe(200);
        expect(res.body).toBeDefined();
    }));
    it("should delete a vacation for admin", () => __awaiter(void 0, void 0, void 0, function* () {
        const vacationId = 123;
        // Mock the vacationsLogic.deleteVacation method as needed
        vacations_logic_1.default.deleteVacation.mockResolvedValueOnce(undefined);
        const res = yield (0, supertest_1.default)(app).delete(`/api/vacations/${vacationId}`);
        expect(res.status).toBe(204);
    }));
});
//# sourceMappingURL=vacations-controller.test.js.map