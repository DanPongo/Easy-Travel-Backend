import request from "supertest";
import express, { Application } from "express";
import vacationsController from "../../6-controllers/vacations-controller";
import vacationsLogic from "../../5-logic/vacations-logic";

// Mock the verifyAdmin and verifyLoggedIn middlewares to allow the request
jest.mock("../../3-middleware/verify-admin", () => {
    return (_req: any, _res: any, next: () => any) => next();
});

jest.mock("../../3-middleware/verify-logged-in", () => {
    return (_req: any, _res: any, next: () => any) => next();
});

// Mock the external logic module
jest.mock("../../5-logic/vacations-logic");

const app: Application = express();
app.use(express.json());
app.use("/api", vacationsController);

describe("Vacations Controller", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("should retrieve all vacations for admin", async () => {
        // Mock the vacationsLogic.getAllVacations method as needed
        (vacationsLogic.getAllVacations as jest.Mock).mockResolvedValueOnce([{ /* mock vacation data */ }]);
        const res = await request(app).get("/api/vacations");
        expect(res.status).toBe(200);
        expect(res.body).toBeDefined();
    });

    it("should retrieve vacations for a specific user", async () => {
        const userId = 1;
        // Mock the vacationsLogic.getVacationsForUser method as needed
        (vacationsLogic.getVacationsForUser as jest.Mock).mockResolvedValueOnce([{ /* mock vacation data for user */ }]);
        const res = await request(app).get(`/api/vacations-users/${userId}`);
        expect(res.status).toBe(200);
        expect(res.body).toBeDefined();
    });



    it("should add a vacation for admin", async () => {
        const vacationData = { /* mock vacation data, including an image property if necessary */ };
        // Mock the vacationsLogic.addVacation method as needed
        (vacationsLogic.addVacation as jest.Mock).mockResolvedValueOnce(vacationData);
        const res = await request(app).post("/api/vacations").send(vacationData);
        expect(res.status).toBe(201);
        expect(res.body).toBeDefined();
    });

    it("should update a vacation for admin", async () => {
        const vacationId = 123;
        const updatedVacationData = { /* mock updated vacation data */ };
        // Mock the vacationsLogic.updateVacation method as needed
        (vacationsLogic.updateVacation as jest.Mock).mockResolvedValueOnce(updatedVacationData);
        const res = await request(app).put(`/api/vacations/${vacationId}`).send(updatedVacationData);
        expect(res.status).toBe(200);
        expect(res.body).toBeDefined();
    });

    it("should delete a vacation for admin", async () => {
        const vacationId = 123;
        // Mock the vacationsLogic.deleteVacation method as needed
        (vacationsLogic.deleteVacation as jest.Mock).mockResolvedValueOnce(undefined);
        const res = await request(app).delete(`/api/vacations/${vacationId}`);
        expect(res.status).toBe(204);
    });
});
