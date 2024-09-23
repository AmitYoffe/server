import { Request, Response, Router } from "express";
import * as MovieService from "../services/movieServices";

export const moviesRouter = Router();

moviesRouter.get("/", async (req: Request, res: Response) => {
  const movies = await MovieService.getAllMovies();
  res.json(movies);
});

moviesRouter.post("/", async (req: Request, res: Response) => {
  const movie = await MovieService.createMovie(req.body);
  res.status(201).json(movie);
});

moviesRouter.put("/", async (req: Request, res: Response) => {
  const movie = await MovieService.editMovie(req.body);
  res.status(201).json(movie);
});
