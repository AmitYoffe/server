import { Request, Response, Router } from "express";
import { checkSchema, validationResult } from "express-validator";
import { StatusCodes } from "http-status-codes";
import { inject, injectable } from "inversify";
import { validationErrorHandler } from "../middlewares";
import { MovieService } from "../services/movieServices";
import { movieBaseValidator, movieEditValidator } from "../validations";

@injectable()
export class MovieController {
  router = Router();

  constructor(@inject(MovieService) private service: MovieService) {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get("/:search?", this.get.bind(this));
    this.router.post(
      "/",
      checkSchema(movieBaseValidator),
      this.post.bind(this)
    );
    this.router.patch(
      "/:id",
      checkSchema(movieEditValidator),
      this.patch.bind(this)
    );
  }

  async get(req: Request, res: Response) {
    const searchQuery = req.params.search;
    const movies = await this.service.getAll(searchQuery);

    res.json(movies);
  }

  async post(req: Request, res: Response) {
    // move this to use middleware 44- 47
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return validationErrorHandler(errors, res);
    }

    const movie = await this.service.create(req.body);
    res.status(StatusCodes.CREATED).json(movie);
  }

  async patch(req: Request, res: Response) {
    const updatedMovieId = Number(req.params.id);
    const movie = await this.service.edit(req.body, updatedMovieId, res);

    res.status(StatusCodes.PARTIAL_CONTENT).json(movie);
  }
}
