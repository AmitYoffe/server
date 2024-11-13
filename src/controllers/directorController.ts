import { Request, Response, Router } from "express";
import { checkSchema } from "express-validator";
import { StatusCodes } from "http-status-codes";
import { inject, injectable } from "inversify";
import { validationHandler } from "../middlewares";
import { DirectorService } from "../services/directorServices";
import {
  directorCreationValidator,
  directorEditValidator,
} from "../validations";

@injectable()
export class DirectorController {
  constructor(
    @inject(DirectorService) private directorService: DirectorService,
    public router = Router(),
    public basePath = "/directors"
  ) {
    this.initializeRoutes();
  }

  initializeRoutes() {
    this.router.get("/", this.get.bind(this));
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

  get(req: Request, res: Response) {
    const searchTerm = req.query.search as string | undefined;
    const directors = this.directorService.get(searchTerm);

    res.status(StatusCodes.OK).json(directors);
  }

  post(req: Request, res: Response) {
    const director = this.directorService.create(req.body);
    res.status(StatusCodes.CREATED).json(director);
  }

  patch(req: Request, res: Response) {
    const updatedDirectorId = Number(req.params.id);

    try {
      const director = this.directorService.edit(req.body, updatedDirectorId);
      res.status(StatusCodes.PARTIAL_CONTENT).json(director);
    } catch (error: unknown) {
      res.status(StatusCodes.NOT_FOUND).json({ message: error });
    }
  }

  delete(req: Request, res: Response) {
    const directorId = Number(req.params.id);

    try {
      this.directorService.delete(directorId);
      res.status(StatusCodes.NO_CONTENT);
    } catch (error: any) {
      res.status(StatusCodes.NOT_FOUND).json({ message: error.message });
    }
  }
}
