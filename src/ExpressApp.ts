import bodyParser from "body-parser";
import dotenv from "dotenv";
import express from "express";
import { inject } from "inversify";
import { DirectorController, MovieController } from "./controllers";
import errorHandler from "./middlewares/error";

class ExpressApp {
    private app: express.Application;
    private port: number;

    constructor(
        @inject(DirectorController) private directorController: DirectorController,
        @inject(MovieController) private movieController: MovieController
    ) {
        dotenv.config();

        this.app = express();
        this.port = parseInt(process.env.PORT as string) || 3000;

        this.useMiddleware();
        this.initializeRoutes();
    }

    private useMiddleware() {
        this.app.use(express.json());
        this.app.use((req, res, next) => {
            console.log('req.body of express app:', req.body);
            next();
        });

        this.app.use(errorHandler);

        // this.app.use(loggerHandler); // this doesn't make a difference
        // add validations here not down in the code
    }

    private initializeRoutes() {
        this.app.get("/", (req, res) => {
            res.send("Hello World!");
        });
        this.app.use("/directors", this.directorController.router);
        this.app.use("/movies", this.movieController.router);
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`Server is running on port ${this.port}`);
        });
    }
}

export default ExpressApp;
