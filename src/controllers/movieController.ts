import { Request, Response, Router } from "express";
import { checkSchema, validationResult } from "express-validator";
import validationErrorHandler from "../middlewares/validationErrorHandler";
import * as MovieService from "../services/movieServices";
import { movieBaseValidator, movieEditValidator } from "../validations/index";
// import { movieEditValidator } from "../validations/movies/editMovie";

export const moviesRouter = Router();

moviesRouter.get(
  "/:search?",
  async (req: Request, res: Response) => {
    const searchQuery = req.params.search as string;
    const movies = await MovieService.getAllMovies(searchQuery);
    res.json(movies);
  }
);

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

// chnage this to patch and make the modification change certain field and not whole object
moviesRouter.put(
  "/:id",
  checkSchema(movieEditValidator),
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    validationErrorHandler(errors, res);

    const updatedMovieId = Number(req.params.id);
    const movie = await MovieService.editMovie(req.body, updatedMovieId);
    res.status(201).json(movie);
  }
);
