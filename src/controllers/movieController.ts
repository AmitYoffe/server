import { Request, Response, Router } from "express";
import { checkSchema, validationResult } from "express-validator";
import { StatusCodes } from "http-status-codes";
import { inject, injectable } from "inversify";
import { checkMovieId, validationErrorHandler } from "../middlewares";
import { MovieService } from "../services/movieServices";
import { movieBaseValidator, movieEditValidator } from "../validations";

@injectable()
export class MovieController {
  router = Router();

  constructor(
    @inject(MovieService) private service: MovieService
  ) {
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
      "/",
      checkSchema(movieEditValidator),
      checkMovieId,
      this.patch.bind(this)
    );
  }

  async get(req: Request, res: Response) {
    const searchQuery = req.params.search;
    const movies = await this.service.getAllMovies(searchQuery);
    res.json(movies);
  }

  async post(req: Request, res: Response) {
    // move this to use middleware 44- 47
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return validationErrorHandler(errors, res);
    }
    const movie = await this.service.createMovie(req.body);
    res.status(StatusCodes.CREATED).json(movie);
  }

  async patch(req: Request, res: Response) {
    const updatedMovieId = Number(req.params.id);
    const movie = await this.service.editMovie(req.body, updatedMovieId);
    res.status(StatusCodes.CREATED).json(movie);
  }
}
