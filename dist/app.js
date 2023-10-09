"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_fileupload_1 = __importDefault(require("express-fileupload"));
const cors_1 = __importDefault(require("cors"));
const app_config_1 = __importDefault(require("./2-utils/app-config"));
const catch_all_1 = __importDefault(require("./3-middleware/catch-all"));
const route_not_found_1 = __importDefault(require("./3-middleware/route-not-found"));
const vacations_controller_1 = __importDefault(require("./6-controllers/vacations-controller"));
const auth_controller_1 = __importDefault(require("./6-controllers/auth-controller"));
const followers_controller_1 = __importDefault(require("./6-controllers/followers-controller"));
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const helmet_1 = __importDefault(require("helmet"));
// Create express server:
const server = (0, express_1.default)();
// Defend against DoS attack:
server.use("/api/", (0, express_rate_limit_1.default)({
    max: 50,
    windowMs: 1000,
    message: "Are you a hacker?" // When performing more request - return this message.
}));
// Helmet defense against malicious headers:
server.use((0, helmet_1.default)({
    crossOriginResourcePolicy: false,
}));
// Limit CORS policy to our front end if data is not public to all world:
server.use((0, cors_1.default)({ origin: app_config_1.default.frontendUrl }));
// Tall express to take JSON resides in request's body into request.body object:
server.use(express_1.default.json());
// Integrate express-fileupload middleware to handle uploaded files:
server.use((0, express_fileupload_1.default)());
//Binding our middleware:
// Tell the server to listen on any router written in our controller:
server.use("/api", vacations_controller_1.default);
server.use("/api", followers_controller_1.default);
server.use("/api", auth_controller_1.default);
// Route not found middleware:
server.use("*", route_not_found_1.default);
// Catch all middleware:
server.use(catch_all_1.default);
server.listen(app_config_1.default.port, () => console.log(`Listening on http://localhost:${app_config_1.default.port}`));
//# sourceMappingURL=app.js.map