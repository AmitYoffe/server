import { Request, Response, Router } from "express";
import { checkSchema, validationResult } from "express-validator";
import { StatusCodes } from "http-status-codes";
import { checkMovieId } from "../middlewares/movies/checkMovieId";
import validationErrorHandler from "../middlewares/validationErrorHandler";
import * as MovieService from "../services/movieServices";
import { movieBaseValidator, movieEditValidator } from "../validations/index";

export const moviesRouter = Router();

moviesRouter.get("/:search?", async (req: Request, res: Response) => {
  const searchQuery = req.params.search;
  const movies = await MovieService.getAllMovies(searchQuery);
  res.json(movies);
});

moviesRouter.post(
  "/",
  checkSchema(movieBaseValidator),
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    validationErrorHandler(errors, res);

    const movie = await MovieService.createMovie(req.body);
    res.status(StatusCodes.CREATED).json(movie);
  }
);

moviesRouter.patch(
  "/:id",
  checkSchema(movieEditValidator),
  checkMovieId,
  async (req: Request, res: Response) => {
    const updatedMovieId = Number(req.params.id);
    const movie = await MovieService.editMovie(req.body, updatedMovieId);
    res.status(StatusCodes.CREATED).json(movie);
  }
);
