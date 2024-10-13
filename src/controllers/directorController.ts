import { Request, Response, Router } from "express";
import { checkSchema, validationResult } from "express-validator";
import { StatusCodes } from "http-status-codes";
import { inject, injectable } from "inversify";
import { checkDirectorId, loggerHandler, validationErrorHandler } from "../middlewares";
import { DirectorService } from "../services/directorServices";
import { directorBaseValidator, directorEditValidator } from "../validations";

@injectable()
export class DirectorController {
  router = Router();

  constructor(
    @inject(DirectorService) private service: DirectorService
  ) {
    this.initializeRoute();
  }

  initializeRoute() {
    this.router.get("/:search?", loggerHandler, this.get.bind(this));
    this.router.post(
      "/",
      loggerHandler,
      checkSchema(directorBaseValidator),
      this.post.bind(this)
    );
    this.router.patch(
      "/:id",
      loggerHandler,
      checkSchema(directorEditValidator),
      checkDirectorId,
      this.patch.bind(this)
    );
  }

  async get(req: Request, res: Response) {
    const searchQuery = req.params.search;
    const directors = await this.service.getAllDirectors(searchQuery);

    res.json(directors);
  }

  async post(req: Request, res: Response) {
    const errors = validationResult(req);
    console.log(`req.body: ${JSON.stringify(req.body)}`);

    if (!errors.isEmpty()) {
      return validationErrorHandler(errors, res);
    }

    const director = await this.service.createDirector(req.body);
    res.status(StatusCodes.CREATED).json(director);
    // fix logic, singular id field created in db even when validations fails !
  }

  async patch(req: Request, res: Response) {
    const updatedDirectorId = Number(req.params.id);
    const director = await this.service.editDirector(req.body, updatedDirectorId);

    res.status(StatusCodes.PARTIAL_CONTENT).json(director);
  }
}
