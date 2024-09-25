import { Request, Response, Router } from "express";
import { checkSchema, validationResult } from "express-validator";
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
    res.status(201).json(movie);
  }
);

moviesRouter.patch(
  "/:id",
  checkSchema(movieEditValidator),
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    validationErrorHandler(errors, res);

    const moviesIdArr = await MovieService.getMovieIds();
    const updatedMovieId = Number(req.params.id);

    // make this into a reusable middleware!
    if (!errors.isEmpty()) {
      return res.status(400).json({ message: `Errors: ${errors.array()}` });
    } else if (!moviesIdArr.includes(updatedMovieId)) {
      return res.status(404).json({
        message: `Movie with id of ${updatedMovieId} not found`,
      });
    } else {
      const movie = await MovieService.editMovie(
        req.body,
        updatedMovieId
      );
      res.status(201).json(movie); 
    }
  }
);
