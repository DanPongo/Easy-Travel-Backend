import express, { Request, Response, NextFunction } from "express";
import path from "path";
import verifyAdmin from "../3-middleware/verify-admin";
import verifyLoggedIn from "../3-middleware/verify-logged-in";
import VacationModel from "../4-models/vacation-model";
import vacationsLogic from "../5-logic/vacations-logic";

const router = express.Router(); // Capital R

// GET http://localhost:3001/api/vacations
router.get("/vacations", verifyAdmin, async (request: Request, response: Response, next: NextFunction) => {
    try {
        const vacations = await vacationsLogic.getAllVacations();
        response.json(vacations);
    }
    catch (err: any) {
        next(err);
    }
});

// GET http://localhost:3001/api/vacations-users/:userId
router.get("/vacations-users/:userId([0-9]+)", verifyLoggedIn, async (request: Request, response: Response, next: NextFunction) => {
    try {
        const userId = +request.params.userId;
        request.body.userId = userId;
        const vacations = await vacationsLogic.getVacationsForUser(userId);
        response.json(vacations);
    }
    catch (err: any) {
        next(err);
    }
});
// GET http://localhost:3001/api/vacations/:vacationId
router.get("/vacations/:vacationId([0-9]+)", verifyAdmin, async (request: Request, response: Response, next: NextFunction) => {
    try {
        const vacationId = +request.params.vacationId;
        const vacation = await vacationsLogic.getOneVacation(vacationId); // Ensure you have this method in your logic
        if (!vacation) {
            return response.status(404).json({ message: "Vacation not found!" });
        }
        response.json(vacation);
    }
    catch (err: any) {
        next(err);
    }
});


//GET http://localhost:3001/api/vacations/images/:imageName
router.get("/vacations/images/:imageName", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const imageName = request.params.imageName;
        const absolutePath = path.join(__dirname, "..", "1-assets", "images", imageName);
        response.sendFile(absolutePath);
    }
    catch (err: any) {
        next(err);
    }
});

// POST http://localhost:3001/api/vacations
router.post("/vacations", verifyAdmin, async (request: Request, response: Response, next: NextFunction) => {
    try {
        // Take uploaded file, set it to the body:
        request.body.image = request.files?.image;
        const vacation = new VacationModel(request.body);
        const addedVacation = await vacationsLogic.addVacation(vacation)
        response.status(201).json(addedVacation);
    }
    catch (err: any) {
        next(err);
    }
});

// PUT http://localhost:3001/api/vacations/:vacationId
router.put("/vacations/:vacationId([0-9]+)", verifyAdmin, async (request: Request, response: Response, next: NextFunction) => {
    try {
        const vacationId = +request.params.vacationId;
        request.body.vacationId = vacationId;

        // Take uploaded file, set it to the body:
        request.body.image = request.files?.image;

        const vacation = new VacationModel(request.body);
        const updatedVacation = await vacationsLogic.updateVacation(vacation);
        response.json(updatedVacation);
    }
    catch (err: any) {
        next(err); // Catch-all middleware
    }
});

// DELETE http://localhost:3001/api/vacations/:vacationId
router.delete("/vacations/:vacationId([0-9]+)", verifyAdmin, async (request: Request, response: Response, next: NextFunction) => {
    try {
        const vacationId = +request.params.vacationId;
        await vacationsLogic.deleteVacation(vacationId);
        response.sendStatus(204);
    }
    catch (err: any) {
        next(err);
    }
});

export default router;