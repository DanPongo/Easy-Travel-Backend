import request from "supertest";
import express, { Application } from "express";
import followersController from "../../6-controllers/followers-controller";
import followersLogic from "../../5-logic/followers-logic";

// Mock the verifyUser middleware to allow the request without authentication
jest.mock("../../3-middleware/verify-user", () => {
    return (_req: any, _res: any, next: () => any) => next();
});

// Mocking the external logic module
jest.mock("../../5-logic/followers-logic");

const app: Application = express();
app.use(express.json());
app.use("/api", followersController);

describe("Followers Router", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("should add a follower", async () => {
        const followerData = {
            userId: 1,
            vacationId: 2
        };
        // Mock the followersLogic.addFollower method as needed
        (followersLogic.addFollower as jest.Mock).mockResolvedValueOnce({ /* mock follower data */ });

        const res = await request(app).post("/api/followers").send(followerData);
        expect(res.status).toBe(201);
        expect(res.body).toBeDefined();
    });

    it("should delete a follower", async () => {
        const userId = 1;
        const vacationId = 2;
        // Mock the followersLogic.deleteFollower method as needed
        (followersLogic.deleteFollower as jest.Mock).mockResolvedValueOnce(undefined);

        const res = await request(app).delete(`/api/followers/${vacationId}/${userId}`);
        expect(res.status).toBe(202);
    });
});
