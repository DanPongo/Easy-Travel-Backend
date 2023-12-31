"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const error_models_1 = require("../4-models/error-models");
function routeNotFound(request, response, next) {
    const err = new error_models_1.RouteNotFoundError(request.originalUrl);
    next(err);
}
exports.default = routeNotFound;
//# sourceMappingURL=route-not-found.js.map