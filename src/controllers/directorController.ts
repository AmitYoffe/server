import { Request, Response, Router } from "express";
import { checkSchema, validationResult } from "express-validator";
import { checkDirectorId } from "../middlewares/directors/checkDirectorId";
import validationErrorHandler from "../middlewares/validationErrorHandler";
import * as directorService from "../services/directorServices";
import { directorBaseValidator } from "../validations/directors/baseDirector";
import { directorEditValidator } from "../validations/directors/editDirector";

export const directorsRouter = Router();

directorsRouter.get("/:search?", async (req: Request, res: Response) => {
  const searchQuery = req.params.search;
  const directors = await directorService.getAllDirectors(searchQuery);
  res.json(directors);
});

directorsRouter.post(
  "/",
  checkSchema(directorBaseValidator),
  async (req: Request, res: Response) => {
    // I am not sure if these 2 lines are even necessary:
    const errors = validationResult(req);
    validationErrorHandler(errors, res);

    const director = await directorService.createDirector(req.body);
    res.status(201).json(director);
  }
);

directorsRouter.patch(
  "/:id",
  checkSchema(directorEditValidator),
  checkDirectorId,
  async (req: Request, res: Response) => {
    const updatedDirectorId = Number(req.params.id);
    const director = await directorService.editDirector(
      req.body,
      updatedDirectorId
    );

    res.status(201).json(director);
  }
);
