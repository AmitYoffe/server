import { Request, Response, Router } from "express";
import { checkSchema } from "express-validator";
import { StatusCodes } from "http-status-codes";
import { inject, injectable } from "inversify";
import { validationHandler } from "../middlewares";
import { MovieService } from "../services/movieServices";
import { movieCreationValidator, movieEditValidator } from "../validations";

@injectable()
export class MovieController {
  constructor(
    @inject(MovieService) private service: MovieService,
    public router = Router(),
    public basePath = '/movies'
  ) {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get("/:search?", this.get.bind(this));
    this.router.post(
      "/",
      checkSchema(movieCreationValidator),
      validationHandler,
      this.post.bind(this)
    );
    this.router.patch(
      "/:id",
      checkSchema(movieEditValidator),
      validationHandler,
      this.patch.bind(this)
    );
    this.router.delete("/:id", this.delete.bind(this));
  }

  async get({ query: { search } }: Request, res: Response) {
    const searchQuery = search as string | undefined;
    const movies = await this.service.get(searchQuery);

    res.status(StatusCodes.OK).json(movies);
  }

  async post(req: Request, res: Response) {
    const movie = await this.service.create(req.body);
    res.status(StatusCodes.CREATED).json(movie);
  }

  async patch(req: Request, res: Response) {
    const updatedMovieId = Number(req.params.id);

    try {
      const movie = await this.service.edit(req.body, updatedMovieId);
      res.status(StatusCodes.PARTIAL_CONTENT).json(movie);
    } catch (error: any) {
      res.status(StatusCodes.PARTIAL_CONTENT).json({ message: error.message });
    }
  }

  async delete(req: Request, res: Response) {
    const movieId = Number(req.params.id);

    try {
      await this.service.delete(movieId);
      res.status(StatusCodes.NO_CONTENT);
    } catch (error: any) {
      res.status(StatusCodes.NOT_FOUND).json({ message: error.message });
    }
  }
}
