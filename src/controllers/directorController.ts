import { Request, Response, Router } from "express";
import { checkSchema, validationResult } from "express-validator";
import { StatusCodes } from "http-status-codes";
import { checkDirectorId } from "../middlewares/directors/checkDirectorId";
import loggerHandler from "../middlewares/loggerHandler";
import validationErrorHandler from "../middlewares/validationErrorHandler";
import {
  createDirector,
  editDirector,
  getAllDirectors,
} from "../services/directorServices";
import { directorBaseValidator, directorEditValidator } from "../validations";

export class DirectorRouter {
  router = Router();

  constructor() {
    this.initializeRoute();
  }

  initializeRoute() {
    // prettify this chunk
    this.router.get("/:search?", loggerHandler, this.get.bind(this));
    this.router.post(
      "/",
      loggerHandler,
      checkSchema(directorBaseValidator),
      this.post.bind(this)
    );
    this.router.get(
      "/:id",
      loggerHandler,
      checkSchema(directorEditValidator),
      checkDirectorId,
      this.patch.bind(this)
    );
  }

  async get(req: Request, res: Response) {
    const searchQuery = req.params.search;
    const directors = await getAllDirectors(searchQuery);
    res.json(directors);
  }

  async post(req: Request, res: Response) {
    const errors = validationResult(req);
    console.log(`req.body: ${JSON.stringify(req.body)}`);

    if (!errors.isEmpty()) {
      return validationErrorHandler(errors, res);
    }

    const director = await createDirector(req.body);
    res.status(StatusCodes.CREATED).json(director);
    // fix logic, singular id field created in db even when validations fails !
  }

  async patch(req: Request, res: Response) {
    const updatedDirectorId = Number(req.params.id);
    const director = await editDirector(req.body, updatedDirectorId);

    res.status(StatusCodes.PARTIAL_CONTENT).json(director);
  }
}
