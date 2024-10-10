import { Request, Response, Router } from "express";
import { checkSchema, validationResult } from "express-validator";
import { StatusCodes } from "http-status-codes";
import loggerHandler from "../middlewares/loggerHandler";
import { checkMovieId } from "../middlewares/movies/checkMovieId";
import validationErrorHandler from "../middlewares/validationErrorHandler";
import {
  createMovie,
  editMovie,
  getAllMovies,
} from "../services/movieServices";
import { movieBaseValidator, movieEditValidator } from "../validations";
// import { movieBaseValidator, movieEditValidator } from "../validations";
// add this bundled import

export class MovieRouter {
  router = Router();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get("/:search?", loggerHandler, this.get.bind(this));
    this.router.post(
      "/",
      loggerHandler,
      checkSchema(movieBaseValidator),
      this.post.bind(this)
    );
    this.router.patch(
      "/",
      loggerHandler,
      checkSchema(movieEditValidator),
      checkMovieId,
      this.patch.bind(this)
    );
  }

  async get(req: Request, res: Response) {
    const searchQuery = req.params.search;
    const movies = await getAllMovies(searchQuery);
    res.json(movies);
  }

  async post(req: Request, res: Response) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return validationErrorHandler(errors, res);
    }
    const movie = await createMovie(req.body);
    res.status(StatusCodes.CREATED).json(movie);
  }

  async patch(req: Request, res: Response) {
    const updatedMovieId = Number(req.params.id);
    const movie = await editMovie(req.body, updatedMovieId);
    res.status(StatusCodes.CREATED).json(movie);
  }
}

// patch and post methods do not work because req.body come as undefined... :(
