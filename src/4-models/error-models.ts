// Base class for client errors
export class ClientError {
    // Constructor with error message and HTTP status code
    public constructor(public message: string, public status: number) { }
}

// Error class for route not found
export class RouteNotFoundError extends ClientError {
    public constructor(route: string) {
        // Provide the specific error message
        super(`Route ${route} not exist`, 404);
    }
}

// Error class for resource (by ID) not found
export class ResourceNotFoundError extends ClientError {
    public constructor(id: number) {
        // Provide the specific error message
        super(`id ${id} not exist`, 404);
    }
}

// Error class for validation issues
export class ValidationError extends ClientError {
    public constructor(message: string) {
        super(message, 400);
    }
}

// Error class for unauthorized access
export class UnauthorizedError extends ClientError {
    public constructor(message: string) {
        super(message, 401);
    }
}
