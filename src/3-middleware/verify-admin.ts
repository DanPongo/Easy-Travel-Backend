// Import necessary modules from express and your utility and model files.
import { NextFunction, Request, Response } from "express";
import cyber from "../2-utils/cyber";
import { UnauthorizedError } from "../4-models/error-models";

async function verifyAdmin(request: Request, response: Response, next: NextFunction) {
    try {
        // Log the headers to check if the token is present.
        console.log("Request Headers: ", request.headers);

        //admin verification.
        const isAdmin = await cyber.verifyAdmin(request);

        //result of admin verification.
        console.log("Is Admin: ", isAdmin);

        // If not admin, throw an UnauthorizedError.
        if (!isAdmin) throw new UnauthorizedError("Log in..");
        
        // if it is admin, pass control to the next middleware or route handler.
        next();
    }
    catch (err: any) {
        // Log the error message and optionally other error details.
        console.error("Error verifying admin: ", err.message);
        if(err.stack) console.error("Error Stack: ", err.stack); // Log the error stack if available.

        // Pass the error to the next error handling middleware.
        next(err);
    }
}

// Export the middleware.
export default verifyAdmin;
