import { Request, Response, Router } from "express";
import { checkSchema, validationResult } from "express-validator";
import validationErrorHandler from "../middlewares/validationErrorHandler";
import * as MovieService from "../services/movieServices";
import { movieBaseValidator } from "../validations/movies/baseMovie";
import { movieEditValidator } from "../validations/movies/editMovie";

export const moviesRouter = Router();

moviesRouter.get("/", async (req: Request, res: Response) => {
  const searchQuery = req.query.search as string;
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
    res.status(201).json(movie);
  }
);

moviesRouter.put(
  "/",
  checkSchema(movieEditValidator),
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    validationErrorHandler(errors, res);

    const updatedMovieId = Number(req.query.id);
    const movie = await MovieService.editMovie(req.body, updatedMovieId);
    res.status(201).json(movie);
  }
);
