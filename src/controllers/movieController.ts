import { Request, Response, Router } from "express";
import { checkSchema, validationResult } from "express-validator";
import { StatusCodes } from "http-status-codes";
import loggerHandler from "../middlewares/loggerHandler";
import { checkMovieId } from "../middlewares/movies/checkMovieId";
import validationErrorHandler from "../middlewares/validationErrorHandler";
import { createMovie, editMovie, getAllMovies } from "../services/movieServices";
import { movieBaseValidator, movieEditValidator } from "../validations/index";

export const moviesRouter = Router();

moviesRouter.get("/:search?", loggerHandler, async (req: Request, res: Response) => {
  const searchQuery = req.params.search;
  const movies = await getAllMovies(searchQuery);
  res.json(movies);
});

moviesRouter.post(
  "/",
  loggerHandler,
  checkSchema(movieBaseValidator),
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    validationErrorHandler(errors, res);

    const movie = await createMovie(req.body);
    res.status(StatusCodes.CREATED).json(movie);
  }
);

moviesRouter.patch(
  "/:id",
  loggerHandler,
  checkSchema(movieEditValidator),
  checkMovieId,
  async (req: Request, res: Response) => {
    const updatedMovieId = Number(req.params.id);
    const movie = await editMovie(req.body, updatedMovieId);
    res.status(StatusCodes.CREATED).json(movie);
  }
);
