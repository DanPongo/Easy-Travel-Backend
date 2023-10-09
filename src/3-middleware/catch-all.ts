import { NextFunction, Request, Response } from "express";
import appConfig from "../2-utils/app-config";
import logger from "../2-utils/logger";

function catchAll(err: any, request: Request, response: Response, next: NextFunction) {

    // Log on the console:
    console.log(err);

    const status = err.status || 500;

    // log server errors:
    if (status === 500) {

        // Log error log file:
        logger.logError("catchAll error", err);
    }

    // Return only on development: 
    const message = appConfig.isDevelopment ? err.message : "Some error occurred, please try again";

    // Send back the error to front:
    response.status(status).send(message);
}

export default catchAll;

