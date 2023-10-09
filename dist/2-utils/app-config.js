"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// General config:
class AppConfig {
    constructor() {
        // Database: 
        this.host = "";
        this.user = "";
        this.password = "";
        this.database = "";
        // Server port 
        this.port = 0;
    }
}
// Development
class DevelopmentConfig extends AppConfig {
    constructor() {
        super(...arguments);
        this.isDevelopment = true;
        this.isProduction = false;
        // Database: 
        this.host = "localhost";
        this.user = "root";
        this.password = "";
        this.database = "vacation";
        // Server: 
        this.port = 3001;
        this.frontendUrl = "http://localhost:3000";
    }
}
// Production 
class ProductionConfig extends AppConfig {
    constructor() {
        super(...arguments);
        this.isDevelopment = false;
        this.isProduction = true;
        // Database: 
        this.host = "localhost";
        this.user = "root";
        this.password = "";
        this.database = "vacation";
        // Server port: 
        this.port = 3001;
        this.frontendUrl = "";
    }
}
const appConfig = (process.env.NODE_ENV === "production") ? new ProductionConfig() : new DevelopmentConfig();
exports.default = appConfig;
//# sourceMappingURL=app-config.js.map