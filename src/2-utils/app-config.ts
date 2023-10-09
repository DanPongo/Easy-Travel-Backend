// General config:
class AppConfig {

    // Database: 
    public host = ""; 
    public user = ""; 
    public password = ""; 
    public database = "";

    // Server port 
    public port = 0;

}

// Development
class DevelopmentConfig extends AppConfig {

    public isDevelopment = true;
    public isProduction = false;

    // Database: 
    public host = "localhost"; 
    public user = "root"; 
    public password = ""; 
    public database = "vacation"; 

    // Server: 
    public port = 3001;

    public frontendUrl = "http://localhost:3000";

}

// Production 
class ProductionConfig extends AppConfig {

    public isDevelopment = false;
    public isProduction = true;

    // Database: 
    public host = "localhost"; 
    public user = "root"; 
    public password = ""; 
    public database = "vacation"; 

    // Server port: 
    public port = 3001;

    public frontendUrl = "";

}

const appConfig = (process.env.NODE_ENV === "production") ? new ProductionConfig() : new DevelopmentConfig();

export default appConfig;