import { NextFunction, Request, Response } from "express";
import cyber from "../2-utils/cyber";
import { UnauthorizedError } from "../4-models/error-models";

async function verifyLoggedIn(request: Request, response: Response, next: NextFunction) {

    try {
        const isValid = await cyber.verifyToken(request);
        if (!isValid) throw new UnauthorizedError("Not logged in");
        next();
    }
    catch (err: any) {
        next(err);
    }

}

export default verifyLoggedIn;