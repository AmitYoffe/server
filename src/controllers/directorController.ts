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
    @inject(DirectorService) private service: DirectorService,
    public router = Router(),
    public basePath = "/directors"
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

  async get(req: Request, res: Response) {
    const searchTerm = req.query.search as string | undefined;
    const directors = await this.service.get(searchTerm);

    res.status(StatusCodes.OK).json(directors);
  }

  async post(req: Request, res: Response) {
    const director = await this.service.create(req.body);
    res.status(StatusCodes.CREATED).json(director);
  }

  async patch(req: Request, res: Response) {
    const updatedDirectorId = Number(req.params.id);

    try {
      const director = await this.service.edit(req.body, updatedDirectorId);
      res.status(StatusCodes.PARTIAL_CONTENT).json(director);
    } catch (error: any) {
      res.status(StatusCodes.NOT_FOUND).json({ message: error.message });
    }
  }

  async delete(req: Request, res: Response) {
    const directorId = Number(req.params.id);

    try {
      await this.service.delete(directorId);
      res.status(StatusCodes.NO_CONTENT);
    } catch (error: any) {
      res.status(StatusCodes.NOT_FOUND).json({ message: error.message });
    }
  }
}
