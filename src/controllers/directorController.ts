import { Request, Response, Router } from "express";
import { checkSchema } from "express-validator";
import { StatusCodes } from "http-status-codes";
import { inject, injectable } from "inversify";
import { validationHandler } from "../middlewares";
import { DirectorService } from "../services/directorServices";
import { directorCreationValidator, directorEditValidator } from "../validations";

@injectable()
export class DirectorController {
  constructor(
    @inject(DirectorService) private service: DirectorService,
    public router = Router(),
    public basePath = '/directors'
  ) {
    this.initializeRoutes();
  }

  initializeRoutes() {
    this.router.get("/:search?", this.get.bind(this));
    this.router.post(
      "/",
      checkSchema(directorCreationValidator),
      validationHandler,
      this.post.bind(this)
    );
    this.router.patch(
      "/:id",
      checkSchema(directorEditValidator),
      validationHandler,
      this.patch.bind(this)
    );
    this.router.delete("/:id", this.delete.bind(this));
  }

  // use query params in my get methods
  // destrcuture where ever i can
  async get({ params: { search } }: Request, res: Response) {
    const directors = await this.service.get(search);

    res.status(StatusCodes.OK).json(directors);
  }

  async post(req: Request, res: Response) {
    const director = await this.service.create(req.body);
    res.status(StatusCodes.CREATED).json(director);
  }

  async patch(req: Request, res: Response) {
    const updatedDirectorId = Number(req.params.id);
    const director = await this.service.edit(req.body, updatedDirectorId, res);

    res.status(StatusCodes.PARTIAL_CONTENT).json(director);
  }

  async delete(req: Request, res: Response) {
    const directorId = Number(req.params.id);
    const isDeleted = await this.service.delete(directorId, res);
    // do not need the constant isDeleted, this response json isnt needed
    if (isDeleted) {
      res.status(StatusCodes.OK).json({
        message: `Deleted director with id of ${directorId}.`
      });
    }
  }
}
