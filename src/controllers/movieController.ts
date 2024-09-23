import { Request, Response, Router } from "express";
import { movieCreationValidator } from "../middlewares/moviesValidator";
import * as MovieService from "../services/movieServices";

export const moviesRouter = Router();

moviesRouter.get("/", async (req: Request, res: Response) => {
  const searchQuery = req.query.search as string;
  const movies = await MovieService.getAllMovies(searchQuery);
  res.json(movies);
});

moviesRouter.post(
  "/",
  // movieCreationValidator,
  async (req: Request, res: Response) => {
    const movie = await MovieService.createMovie(req.body);
    res.status(201).json(movie);
  }
);

moviesRouter.put("/", async (req: Request, res: Response) => {
  const updatedMovieId = Number(req.query.id);
  const movie = await MovieService.editMovie(req.body, updatedMovieId);
  res.status(201).json(movie);
});
