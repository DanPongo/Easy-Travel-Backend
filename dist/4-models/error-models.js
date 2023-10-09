"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UnauthorizedError = exports.ValidationError = exports.ResourceNotFoundError = exports.RouteNotFoundError = exports.ClientError = void 0;
// Base class for client errors
class ClientError {
    // Constructor with error message and HTTP status code
    constructor(message, status) {
        this.message = message;
        this.status = status;
    }
}
exports.ClientError = ClientError;
// Error class for route not found
class RouteNotFoundError extends ClientError {
    constructor(route) {
        // Provide the specific error message
        super(`Route ${route} not exist`, 404);
    }
}
exports.RouteNotFoundError = RouteNotFoundError;
// Error class for resource (by ID) not found
class ResourceNotFoundError extends ClientError {
    constructor(id) {
        // Provide the specific error message
        super(`id ${id} not exist`, 404);
    }
}
exports.ResourceNotFoundError = ResourceNotFoundError;
// Error class for validation issues
class ValidationError extends ClientError {
    constructor(message) {
        super(message, 400);
    }
}
exports.ValidationError = ValidationError;
// Error class for unauthorized access
class UnauthorizedError extends ClientError {
    constructor(message) {
        super(message, 401);
    }
}
exports.UnauthorizedError = UnauthorizedError;
//# sourceMappingURL=error-models.js.map