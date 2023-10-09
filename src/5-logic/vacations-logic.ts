import { OkPacket } from "mysql";
import dal from "../2-utils/dal";
import { ResourceNotFoundError, ValidationError } from "../4-models/error-models";
import VacationModel from "../4-models/vacation-model";
import { v4 as uuid } from "uuid";
import fs from "fs";

// Get all vacations: 
async function getAllVacations(): Promise<VacationModel[]> {

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
    const vacations = await dal.execute(sql);

    // Return all vacations:
    return vacations;

}
// Get a single vacation by its ID
async function getOneVacation(vacationId: number): Promise<VacationModel> {

    // SQL query to get a single vacation by its ID:
    const sql = `
        SELECT * 
        FROM vacations 
        WHERE vacationId = ?
    `;

    // Execute:
    const vacations = await dal.execute(sql, [vacationId]);

    // If no results are returned:
    if (vacations.length === 0) {
        throw new ResourceNotFoundError(vacationId);
    }

    // Return the vacation:
    return vacations[0];
}

async function getVacationsForUser(userId: number) {

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
    const vacations = await dal.execute(sql, [userId]);

    // Return all vacations:
    return vacations;

}

// Add new vacation: 
async function addVacation(vacation: VacationModel): Promise<VacationModel> {

    //Validation:
    const error = vacation.validate();
    if (error) throw new ValidationError(error);

    // Save image
    if (vacation.image) {

        const extension = vacation.image.name.substring(vacation.image.name.lastIndexOf("."));
        vacation.imageName = uuid() + extension;
        await vacation.image.mv("./src/1-assets/images/" + vacation.imageName);
        delete vacation.image;

    }

    // Query:
    const sql = `INSERT INTO vacations VALUES(DEFAULT, ?, ?, ?, ?, ?, ?)`;

    const info: OkPacket = await dal.execute(sql, [vacation.description, vacation.destination, vacation.imageName, vacation.checkIn, vacation.checkOut, vacation.price]);

    vacation.vacationId = info.insertId;

    return vacation;

}

// Update existing vacation: 
async function updateVacation(vacation: VacationModel): Promise<VacationModel> {

    // Validation: 
    const error = vacation.validate();
    if (error) throw new ValidationError(error);

    // Fetch the current imageName from the database
    const currentVacation = await dal.execute(`SELECT imageName FROM vacations WHERE vacationId = ?`, [vacation.vacationId]);
    const currentImageName = currentVacation[0]?.imageName;

    // Save image to disk if exist:
    if (vacation.image) {

        // If we have a previous image:
        if (fs.existsSync("./src/1-assets/images/" + currentImageName)) {

            // Delete it:
            fs.unlinkSync("./src/1-assets/images/" + currentImageName);
        }
        const extension = vacation.image.name.substring(vacation.image.name.lastIndexOf("."));
        vacation.imageName = uuid() + extension;
        await vacation.image.mv("./src/1-assets/images/" + vacation.imageName);
        delete vacation.image;
    } else {
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
    const info: OkPacket = await dal.execute(sql, [vacation.description, vacation.destination, vacation.imageName, vacation.checkIn, vacation.checkOut, vacation.price, vacation.vacationId]);

    // If not exist:
    if (info.affectedRows === 0) throw new ResourceNotFoundError(vacation.vacationId);

    // Return:
    return vacation;
}

// Delete exist vacation:
async function deleteVacation(vacationId: number): Promise<void> {

    // Query:
    const sql = `DELETE FROM vacations WHERE vacationId = ?`;

    // Execute: 
    const info: OkPacket = await dal.execute(sql, [vacationId]);

    // If not exist:
    if (info.affectedRows === 0) throw new ResourceNotFoundError(vacationId);

}

export default {
    getAllVacations,
    getVacationsForUser,
    addVacation,
    getOneVacation,
    updateVacation,
    deleteVacation
};


