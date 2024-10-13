// import bodyParser from "body-parser";
import dotenv from "dotenv";
import express, { json } from "express";
import { DirectorRouter, MovieRouter } from "./controllers";
import errorHandler from "./middlewares/error";

class ExpressApp {
    private app: express.Application;
    private port: number;
    private directorRouter: DirectorRouter;
    private movieRouter: MovieRouter;

    constructor() {
        dotenv.config();

        this.app = express();
        this.port = parseInt(process.env.PORT as string) || 3000;
        this.directorRouter = new DirectorRouter();
        this.movieRouter = new MovieRouter();

        this.initializeRoutes();
        this.useMiddleware();
    }

    private initializeRoutes() {
        this.app.get("/", (req, res) => {
            res.send("Hello World!");
        });
        this.app.use("/directors", this.directorRouter.router);
        this.app.use("/movies", this.movieRouter.router);
    }

    private useMiddleware() {
        // this.app.use(loggerHandler); // this doesn't make a difference
        this.app.use(json());
        // this.app.use(bodyParser.json());
        this.app.use(errorHandler);
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`Server is running on port ${this.port}`);
        });
    }
}

export default ExpressApp;
