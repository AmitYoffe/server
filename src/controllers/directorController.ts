import { Request, Response, Router } from "express";
import { checkSchema } from "express-validator";
import { StatusCodes } from "http-status-codes";
import { inject, injectable } from "inversify";
import { validationHandler } from "../middlewares";
import { DirectorService } from "../services/directorServices";
import { directorBaseValidator, directorEditValidator } from "../validations";

@injectable()
export class DirectorController {
  constructor(
    @inject(DirectorService) private service: DirectorService,
    public router = Router()
  ) {
    this.initializeRoute();
  }

  initializeRoute() {
    this.router.get("/:search?", this.get.bind(this));
    this.router.post(
      "/",
      checkSchema(directorBaseValidator),
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
    const searchQuery = req.params.search;
    const directors = await this.service.getAll(searchQuery);

    res.json(directors);
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
    // add deletion controller logic 
  }
}
