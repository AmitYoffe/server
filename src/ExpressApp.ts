import dotenv from "dotenv";
import express from "express";
import loggerHandler from "./middlewares/loggerHandler";
import errorHandler from "./middlewares/error";
import { directorsRouter } from "./controllers/directorController";

class ExpressApp {
    private app: express.Application;
    private port: number;

    constructor() {
        dotenv.config();
        
        this.app = express();
        this.port = parseInt(process.env.PORT as string) || 3000;
        this.initializeRoutes();
        this.useMiddleware();
    }

    private initializeRoutes() {
        this.app.get("/", (req, res) => {
            res.send("Hello World!");
        });
        this.app.use("/directors", directorsRouter);
    }

    private useMiddleware() {
        this.app.use(loggerHandler);
        this.app.use(express.json());
        this.app.use(errorHandler);
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`Server is running on port ${this.port}`);
        });
    }
}

export default ExpressApp;