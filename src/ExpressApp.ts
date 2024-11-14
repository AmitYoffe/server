import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import { ControllerType } from "./dtos/controllerDto";
import { errorHandler, loggerHandler } from "./middlewares";
import { containerInitializer } from "./containerInitializer";

class ExpressApp {
  private app: express.Application;
  private port: number;
  private controllers: ControllerType[];

  constructor() {
    dotenv.config();
    this.controllers = containerInitializer();

    this.app = express();
    this.port = Number(process.env.PORT as string) || 3000;

    this.initializeMiddleware();
    this.initializeRoutes();
  }

  private initializeMiddleware() {
    this.app.use(express.json());
    this.app.use(cors());
    this.app.use(loggerHandler);
    this.app.use(errorHandler);
  }

  private initializeRoutes() {
    this.app.get("/", (_req, res) => {
      res.send("Hello World!");
    });

    this.controllers.forEach((controller) => {
      this.app.use(controller.basePath, controller.router)
    });
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`Server is running on port ${this.port}`);
    });
  }
}

export default ExpressApp;
