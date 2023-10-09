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
const followers_controller_1 = __importDefault(require("../../6-controllers/followers-controller"));
const followers_logic_1 = __importDefault(require("../../5-logic/followers-logic"));
// Mock the verifyUser middleware to allow the request without authentication
jest.mock("../../3-middleware/verify-user", () => {
    return (_req, _res, next) => next();
});
// Mocking the external logic module
jest.mock("../../5-logic/followers-logic");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use("/api", followers_controller_1.default);
describe("Followers Router", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });
    it("should add a follower", () => __awaiter(void 0, void 0, void 0, function* () {
        const followerData = {
            userId: 1,
            vacationId: 2
        };
        // Mock the followersLogic.addFollower method as needed
        followers_logic_1.default.addFollower.mockResolvedValueOnce({ /* mock follower data */});
        const res = yield (0, supertest_1.default)(app).post("/api/followers").send(followerData);
        expect(res.status).toBe(201);
        expect(res.body).toBeDefined();
    }));
    it("should delete a follower", () => __awaiter(void 0, void 0, void 0, function* () {
        const userId = 1;
        const vacationId = 2;
        // Mock the followersLogic.deleteFollower method as needed
        followers_logic_1.default.deleteFollower.mockResolvedValueOnce(undefined);
        const res = yield (0, supertest_1.default)(app).delete(`/api/followers/${vacationId}/${userId}`);
        expect(res.status).toBe(202);
    }));
});
//# sourceMappingURL=followers-controller.test.js.map