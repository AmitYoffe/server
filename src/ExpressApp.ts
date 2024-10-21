import cors from 'cors';
import dotenv from "dotenv";
import express from "express";
import { controllerDto } from './dtos/controllerDto';
import { errorHandler, loggerHandler } from "./middlewares";

class ExpressApp {
  private app: express.Application;
  private port: number;

  constructor(
    private controllers: controllerDto[]
  ) {
    dotenv.config();

    this.app = express();
    this.port = Number(process.env.PORT as string) || 3000;

    this.useMiddleware();
    this.initializeRoutes();
  }

  private useMiddleware() {
    this.app.use(express.json());
    this.app.use(errorHandler);
    this.app.use(cors());
    this.app.use(loggerHandler);
  }

  private initializeRoutes() {
    this.app.get("/", (_req, res) => {
      res.send("Hello World!");
    });

    this.controllers.forEach(controller => {
      this.app.use(controller.basePath, controller.router);
    });
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`Server is running on port ${this.port}`);
    });
  }
}

export default ExpressApp;
