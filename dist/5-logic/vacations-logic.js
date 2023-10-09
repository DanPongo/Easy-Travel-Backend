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
const dal_1 = __importDefault(require("../2-utils/dal"));
const error_models_1 = require("../4-models/error-models");
const uuid_1 = require("uuid");
const fs_1 = __importDefault(require("fs"));
// Get all vacations: 
function getAllVacations() {
    return __awaiter(this, void 0, void 0, function* () {
        // sql:
        const sql = `SELECT DISTINCT
        V.vacationId, description, destination, imageName, DATE_FORMAT(checkIn,'%Y-%m-%d') AS checkIn, DATE_FORMAT(checkOut,'%Y-%m-%d') AS checkOut, price,
        EXISTS(SELECT * FROM followers WHERE vacationId = F.vacationId) AS isFollowing,
        COUNT(F.userId) AS followersAmount
        FROM vacations AS V LEFT JOIN followers AS F
        ON V.vacationId = F.vacationId 
        GROUP BY vacationId
        ORDER BY V.checkIn DESC`;
        // Execute:
        const vacations = yield dal_1.default.execute(sql);
        // Return all vacations:
        return vacations;
    });
}
// Get a single vacation by its ID
function getOneVacation(vacationId) {
    return __awaiter(this, void 0, void 0, function* () {
        // SQL query to get a single vacation by its ID:
        const sql = `
        SELECT * 
        FROM vacations 
        WHERE vacationId = ?
    `;
        // Execute:
        const vacations = yield dal_1.default.execute(sql, [vacationId]);
        // If no results are returned:
        if (vacations.length === 0) {
            throw new error_models_1.ResourceNotFoundError(vacationId);
        }
        // Return the vacation:
        return vacations[0];
    });
}
function getVacationsForUser(userId) {
    return __awaiter(this, void 0, void 0, function* () {
        // Query: 
        const sql = `
    SELECT DISTINCT
        V.vacationId, description, destination, imageName, DATE_FORMAT(checkIn,'%Y-%m-%d') AS checkIn, DATE_FORMAT(checkOut,'%Y-%m-%d') AS checkOut, price,
        EXISTS(SELECT * FROM followers WHERE vacationId = F.vacationId AND userId = ?) AS isFollow,
        COUNT (F.userId) AS followersAmount
        FROM vacations AS V LEFT JOIN followers AS F
        ON V.vacationId = F.vacationId 
        GROUP BY vacationId
        ORDER BY checkIn DESC
    `;
        // Execute:
        const vacations = yield dal_1.default.execute(sql, [userId]);
        // Return all vacations:
        return vacations;
    });
}
// Add new vacation: 
function addVacation(vacation) {
    return __awaiter(this, void 0, void 0, function* () {
        //Validation:
        const error = vacation.validate();
        if (error)
            throw new error_models_1.ValidationError(error);
        // Save image
        if (vacation.image) {
            const extension = vacation.image.name.substring(vacation.image.name.lastIndexOf("."));
            vacation.imageName = (0, uuid_1.v4)() + extension;
            yield vacation.image.mv("./src/1-assets/images/" + vacation.imageName);
            delete vacation.image;
        }
        // Query:
        const sql = `INSERT INTO vacations VALUES(DEFAULT, ?, ?, ?, ?, ?, ?)`;
        const info = yield dal_1.default.execute(sql, [vacation.description, vacation.destination, vacation.imageName, vacation.checkIn, vacation.checkOut, vacation.price]);
        vacation.vacationId = info.insertId;
        return vacation;
    });
}
// Update existing vacation: 
function updateVacation(vacation) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        // Validation: 
        const error = vacation.validate();
        if (error)
            throw new error_models_1.ValidationError(error);
        // Fetch the current imageName from the database
        const currentVacation = yield dal_1.default.execute(`SELECT imageName FROM vacations WHERE vacationId = ?`, [vacation.vacationId]);
        const currentImageName = (_a = currentVacation[0]) === null || _a === void 0 ? void 0 : _a.imageName;
        // Save image to disk if exist:
        if (vacation.image) {
            // If we have a previous image:
            if (fs_1.default.existsSync("./src/1-assets/images/" + currentImageName)) {
                // Delete it:
                fs_1.default.unlinkSync("./src/1-assets/images/" + currentImageName);
            }
            const extension = vacation.image.name.substring(vacation.image.name.lastIndexOf("."));
            vacation.imageName = (0, uuid_1.v4)() + extension;
            yield vacation.image.mv("./src/1-assets/images/" + vacation.imageName);
            delete vacation.image;
        }
        else {
            // If no new image is provided, set imageName to the previous value
            vacation.imageName = currentImageName;
        }
        // Query: 
        const sql = `
        UPDATE vacations SET 
            description = ?,
            destination = ?,
            imageName = ?,
            checkIn = ?,
            checkOut = ?,
            price = ?
        WHERE vacationId = ?
    `;
        // Execute: 
        const info = yield dal_1.default.execute(sql, [vacation.description, vacation.destination, vacation.imageName, vacation.checkIn, vacation.checkOut, vacation.price, vacation.vacationId]);
        // If not exist:
        if (info.affectedRows === 0)
            throw new error_models_1.ResourceNotFoundError(vacation.vacationId);
        // Return:
        return vacation;
    });
}
// Delete exist vacation:
function deleteVacation(vacationId) {
    return __awaiter(this, void 0, void 0, function* () {
        // Query:
        const sql = `DELETE FROM vacations WHERE vacationId = ?`;
        // Execute: 
        const info = yield dal_1.default.execute(sql, [vacationId]);
        // If not exist:
        if (info.affectedRows === 0)
            throw new error_models_1.ResourceNotFoundError(vacationId);
    });
}
exports.default = {
    getAllVacations,
    getVacationsForUser,
    addVacation,
    getOneVacation,
    updateVacation,
    deleteVacation
};
//# sourceMappingURL=vacations-logic.js.map